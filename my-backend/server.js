// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { OpenAI } = require('openai');
// const { TranslationServiceClient } = require('@google-cloud/translate');

// // Initialize apps
// const chatApp = express();
// const translateApp = express();

// // Middleware
// chatApp.use(bodyParser.json());
// chatApp.use(cors());
// translateApp.use(bodyParser.json());
// translateApp.use(cors());

// // Port numbers
// const CHAT_API_PORT = process.env.CHAT_API_PORT || 5000;
// const TRANSLATE_API_PORT = process.env.TRANSLATE_API_PORT || 5001;

// // Environment Variables
// const apiKey = process.env.OPENAI_API_KEY;
// const translateKey = process.env.GOOGLE_TRANSLATE_API_KEY;



// // Validate Environment Variables
// if (!apiKey) {
//   console.error('Error: Missing OPENAI_API_KEY in .env');
//   process.exit(1);
// }
// if (!translateKey) {
//   console.error('Error: Missing GOOGLE_TRANSLATE_API_KEY in .env');
//   process.exit(1);
// }

// // OpenAI and Translation Client Setup
// const translationClient = new TranslationServiceClient();
// const openai = new OpenAI({ apiKey });

// let conversationHistory = {}; 

// // Chat API Route
// chatApp.post('/api/chat', async (req, res) => {
//   const { userInput, systemRole, userRole, selectLanguageDropdown, userId } = req.body;

//   console.log("Received Request:", JSON.stringify(req.body, null, 2));

//   // Log inputs
//   console.log("Received Request Body:", JSON.stringify(req.body, null, 2));
//   console.log("  User Input:", userInput);
//   console.log("  System Role:", systemRole);
//   console.log("  User Role:", userRole);
//   console.log("  Selected Language:", selectLanguageDropdown);

//   if (!userInput || !systemRole || !userRole ||!selectLanguageDropdown) {
//     return res.status(400).json({ error: 'Invalid request: Missing required fields' });
//   }

//   try {
//     const aiResponse = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: `System is playing the role of: ${systemRole}` },
//         { role: 'user', content: `User is practicing ${selectLanguageDropdown}, start the conversation with one prompt with user role-playing as: ${userRole} in the scenario of: "${userInput}" and wait for user to respond` },
//       ],
//       max_tokens: 150,
//       temperature: 0.7,
//     });

//     const responseText = aiResponse.choices[0]?.message?.content?.trim() || 'No response';
//     res.json({ response: responseText });
//   } catch (error) {
//     console.error('Error processing the request:', error.message);
//     res.status(500).json({ error: 'Error processing your request.' });
//   }
// });

// // Translate API Route
// translateApp.post('/api/translate', async (req, res) => {
//   const { text, targetLanguage = 'en' } = req.body;

//   if (!text || typeof text !== 'string') {
//     return res.status(400).json({ error: 'Invalid or missing text input' });
//   }

//   try {
//     const [response] = await translationClient.translateText({
//       contents: [text],
//       targetLanguageCode: targetLanguage,
//       parent: translationClient.locationPath(translateKey, 'global'),
//     });

//     const translatedText = response.translations[0].translatedText;
//     res.json({ translatedText });
//   } catch (error) {
//     console.error('Translation Error:', error.message);
//     res.status(500).json({ error: 'Failed to translate text.' });
//   }
// });

// // Start servers
// chatApp.listen(CHAT_API_PORT, () => {
//   console.log(`Chat API running on http://localhost:${CHAT_API_PORT}`);
// });

// translateApp.listen(TRANSLATE_API_PORT, () => {
//   console.log(`Translate API running on http://localhost:${TRANSLATE_API_PORT}`);
// });

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');
const { TranslationServiceClient } = require('@google-cloud/translate');

// Initialize apps
const chatApp = express();
const translateApp = express();

// Middleware
chatApp.use(bodyParser.json());
chatApp.use(cors());
translateApp.use(bodyParser.json());
translateApp.use(cors());

// Port numbers
const CHAT_API_PORT = process.env.CHAT_API_PORT || 5002;
const TRANSLATE_API_PORT = process.env.TRANSLATE_API_PORT || 5003;

// Environment Variables
const apiKey = process.env.OPENAI_API_KEY;
const translateKey = process.env.GOOGLE_TRANSLATE_API_KEY;

// Validate Environment Variables
if (!apiKey) {
  console.error('Error: Missing OPENAI_API_KEY in .env');
  process.exit(1);
}
if (!translateKey) {
  console.error('Error: Missing GOOGLE_TRANSLATE_API_KEY in .env');
  process.exit(1);
}

// OpenAI and Translation Client Setup
const translationClient = new TranslationServiceClient();
const openai = new OpenAI({ apiKey });

let conversationHistory = {}; // Object to store conversation history for each user

// Initialize Chat (Setup the conversation)
chatApp.post('/api/init', (req, res) => {
  const { systemRole, userRole, selectLanguageDropdown, userId, userInput } = req.body;

  console.log("Initializing Conversation:", JSON.stringify(req.body, null, 2));

  if (!systemRole || !userRole || !selectLanguageDropdown || !userId || !userInput) {
    return res.status(400).json({ error: 'Invalid request: Missing required fields' });
  }

  // initialize the conversation history for the user
  conversationHistory[userId] = {
    messages: [
      { role: 'system', content: `System is playing the role of: ${systemRole}` },
      { role: 'user', content: `User is practicing ${selectLanguageDropdown}, start the conversation with one prompt with user role-playing as: ${userRole} in the scenario of: "${userInput}" and wait for user to respond` },
    ],
    meta: {
      systemRole,
      userRole,
      selectLanguageDropdown, 
    },
  };

  res.json({ message: 'Conversation initialized successfully.' });
});

// Chat API Route (Continue the conversation)
chatApp.post('/api/chat', async (req, res) => {
  const { userInput, userId } = req.body;

  console.log("Received Conversation Continuation Request:", JSON.stringify(req.body, null, 2));

  if (!userInput || !userId) {
    return res.status(400).json({ error: 'Invalid request: Missing required fields' });
  }

  // Check if the conversation history exists for the user
  const userHistory = conversationHistory[userId];
  if (!userHistory) {
    return res.status(400).json({ error: 'Conversation not initialized. Please initialize first.' });
  }

  const { messages, meta } = userHistory;

  // Append the new user input to the conversation history
  messages.push({ role: 'user', content: userInput });

  try {
    // Make request to OpenAI API with the entire conversation history
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 150,
      temperature: 0.7,
    });

    const responseText = aiResponse.choices[0]?.message?.content?.trim() || 'No response';

    // add AI response to the conversation history
    messages.push({ role: 'assistant', content: responseText });

    // send response back to the client
    res.json({
      response: responseText,
      meta, // send meta info back for debugging or reference
    });
  } catch (error) {
    console.error('Error processing the request:', error.message);
    res.status(500).json({ error: 'Error processing your request.' });
  }
});

// End Chat (Clear conversation history)
chatApp.post('/api/end', (req, res) => {
  const { userId } = req.body;

  if (!userId || !conversationHistory[userId]) {
    return res.status(400).json({ error: 'No active conversation found for this user.' });
  }

  // Clear conversation history for the user
  delete conversationHistory[userId];

  res.json({ message: 'Conversation ended successfully.' });
});

// Translate API Route
translateApp.post('/api/translate', async (req, res) => {
  const { text, targetLanguage = 'en' } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing text input' });
  }

  try {
    const [response] = await translationClient.translateText({
      contents: [text],
      targetLanguageCode: targetLanguage,
      parent: translationClient.locationPath(translateKey, 'global'),
    });

    const translatedText = response.translations[0].translatedText;
    res.json({ translatedText });
  } catch (error) {
    console.error('Translation Error:', error.message);
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});

// Start servers
chatApp.listen(CHAT_API_PORT, () => {
  console.log(`Chat API running on http://localhost:${CHAT_API_PORT}`);
});

translateApp.listen(TRANSLATE_API_PORT, () => {
  console.log(`Translate API running on http://localhost:${TRANSLATE_API_PORT}`);
});
