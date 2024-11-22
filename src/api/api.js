import fs from "fs";
import express from 'express';
import { Configuration, OpenAIApi } from "openai";
import cors from 'cors'; 

const app = express();
app.use(cors());
const port = 5000;

const configuration = new Configuration({
    apiKey: "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",

});

const openai = new OpenAIApi(configuration);

// If you're planning to use Google Translate or some other translation service, make sure to import it here.
// import { Translate } from '@google-cloud/translate'; 

app.post('/transcribe', async (req, res) => {
    try {
        // Transcribe audio to text
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream("/Users/umapatel/myNewestTeck@NYUProject/langcon/uploads/video1606422781.mp4"),
            model: "whisper-1",
            language: "fr", // Set language for transcription (optional)
        });
        
        // Send the transcribed text as a JSON response
        res.json({ transcribedText: transcription.text });

    } catch (error) {
        console.error('Error during transcription:', error);
        res.status(500).json({ error: 'Failed to transcribe audio' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
