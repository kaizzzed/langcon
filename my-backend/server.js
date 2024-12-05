require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const { TranslationServiceClient } = require('@google-cloud/translate');
const cors = require('cors');
const app = express();
const port = 5002; /// u have to change this port  EVERYTIME u want to run the backend

app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.OPENAI_API_KEY;
const googleProjectId = process.env.GOOGLE_PROJECT_ID;

if (!apiKey) {
  console.error('OPENAI_API_KEY is missing in the .env file');
  process.exit(1);
}

if (!googleProjectId) {
  console.error('GOOGLE_PROJECT_ID is missing in the .env file');
  process.exit(1);
}

const openai = new OpenAI({ apiKey });
const translationClient = new TranslationServiceClient();

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.post('/api/chat', async (req, res) => {
  const { userInput, systemRole, userRole, language } = req.body;

  if (!userInput || !systemRole || !userRole || !language) {
    return res.status(400).json({ error: 'Invalid request: Missing required fields' });
  }

  try {
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `System is playing the role of: ${systemRole}`,
        },
        {
          role: 'user',
          content: `User is trying to practice ${language}, playing the role of: ${userRole} in the scenario of: "${userInput}"`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const responseText = aiResponse.choices[0]?.message?.content?.trim() || 'No response';
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error processing the OpenAI request:', error.message);
    console.error('Full error details:', error);
    res.status(500).json({ error: 'Error processing your request.' });
  }
});

app.post('/translate', async (req, res) => {
  const text = req.body.text;
  const targetLanguage = req.body.targetLanguage || 'fr'; // Default to French if not provided

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

    console.log(`Original: ${text}`);
    console.log(`Translated: ${translatedText}`);

    res.json({ translatedText });
  } catch (error) {
    console.error('Error during translation:', error.message);
    console.error('Full error details:', error);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
