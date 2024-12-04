

require('dotenv').config(); // Ensure this is at the top

console.log('API Key:', process.env.OPENAI_API_KEY);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai'); // Correctly import OpenAI

// Initialize express app
const app = express(); 
const port = 5000;

// Use middleware to parse JSON
app.use(bodyParser.json());
app.use(cors()); // Use CORS after app initialization

// API key from .env file
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY is missing in the .env file');
  process.exit(1); // Exit if no API key is provided
}

// OpenAI API instance
const openai = new OpenAI({
  apiKey,
});

// Handle chat requests
app.post('/api/chat', async (req, res) => {
  const { userInput, systemRole, userRole, selectLanguageDropdown } = req.body;
  console.log("req.body"+req.body)
  // Check if all required fields are there
  if (!userInput || !systemRole || !userRole || !selectLanguageDropdown) {
    return res.status(400).json({ error: 'Invalid request: Missing required fields' });
  }

  try {
    // Make a request to the OpenAI API
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Adjust to your OpenAI model
      messages: [
        {
          role: 'system',
          content: `System is playing the role of: ${systemRole}`,
        },
        {
          role: 'user',
          content: `User is trying to practice ${selectLanguageDropdown}, playing the role of: ${userRole} in the scenario of: "${userInput}"`, // Use userInput here
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Extract and send the AI response
    const responseText = aiResponse.choices[0]?.message?.content?.trim() || 'No response';
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error processing the request: hello', error.message);
    res.status(500).json({ error: 'Error processing your request.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});