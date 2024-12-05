require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');
const { TranslationServiceClient } = require('@google-cloud/translate');

// Port numbers
const CHAT_API_PORT = process.env.CHAT_API_PORT || 5000;
const TRANSLATE_API_PORT = process.env.TRANSLATE_API_PORT || 5001;

// Environment Variables
const apiKey = process.env.OPENAI_API_KEY;
const googleProjectId = process.env.GOOGLE_PROJECT_ID;

// Validate Environment Variables
if (!apiKey) {
  console.error('Error: Missing OPENAI_API_KEY in .env');
  process.exit(1);
}
if (!googleProjectId) {
  console.error('Error: Missing GOOGLE_PROJECT_ID in .env');
  process.exit(1);
}

// OpenAI and Translation Client Setup
const openai = new OpenAI({ apiKey });
const translationClient = new TranslationServiceClient();

// CHAT API
const chatApp = express();
chatApp.use(cors());
chatApp.use(bodyParser.json());

chatApp.post('/api/chat', async (req, res) => {
  const { userInput, systemRole, userRole, language } = req.body;

  if (!userInput || !systemRole || !userRole || !language) {
    return res.status(400).json({ error: 'Invalid request: Missing required fields' });
  }

  try {
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `System is playing the role of: ${systemRole}` },
        { role: 'user', content: `User is practicing ${language}, role: ${userRole}, scenario: "${userInput}"` },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const responseText = aiResponse.choices[0]?.message?.content?.trim() || 'No response';
    res.json({ response: responseText });
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    res.status(500).json({ error: 'Failed to process chat request.' });
  }
});

// TRANSLATE API
const translateApp = express();
translateApp.use(cors());
translateApp.use(bodyParser.json());

translateApp.post('/api/translate', async (req, res) => {
  const { text, targetLanguage = 'fr' } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing text input' });
  }

  try {
    const [response] = await translationClient.translateText({
      contents: [text],
      targetLanguageCode: targetLanguage,
      parent: translationClient.locationPath(googleProjectId, 'global'),
    });

    const translatedText = response.translations[0].translatedText;
    res.json({ translatedText });
  } catch (error) {
    console.error('Translation Error:', error.message);
    res.status(500).json({ error: 'Failed to translate text.' });
  }
});

// Start the servers
chatApp.listen(CHAT_API_PORT, () => {
  console.log(`Chat API running on http://localhost:${CHAT_API_PORT}`);
});

translateApp.listen(TRANSLATE_API_PORT, () => {
  console.log(`Translate API running on http://localhost:${TRANSLATE_API_PORT}`);
});
