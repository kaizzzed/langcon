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
const CHAT_API_PORT = process.env.CHAT_API_PORT || 5000;
const TRANSLATE_API_PORT = process.env.TRANSLATE_API_PORT || 5001;

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

// Chat API Route
chatApp.post('/api/chat', async (req, res) => {
  const { userInput, systemRole, userRole, selectLanguageDropdown } = req.body;

  console.log("Received Request:", JSON.stringify(req.body, null, 2));

  // Log inputs
  console.log("Received Request Body:", JSON.stringify(req.body, null, 2));
  console.log("  User Input:", userInput);
  console.log("  System Role:", systemRole);
  console.log("  User Role:", userRole);
  console.log("  Selected Language:", selectLanguageDropdown);

  if (!userInput || !systemRole || !userRole ||!selectLanguageDropdown) {
    return res.status(400).json({ error: 'Invalid request: Missing required fields' });
  }

  try {
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `System is playing the role of: ${systemRole}` },
        { role: 'user', content: `User is practicing ${selectLanguageDropdown}, role-playing as: ${userRole} in the scenario of: "${userInput}"` },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const responseText = aiResponse.choices[0]?.message?.content?.trim() || 'No response';
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error processing the request:', error.message);
    res.status(500).json({ error: 'Error processing your request.' });
  }
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
