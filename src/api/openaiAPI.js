import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();
const translate = new Translate();

async function main() {
 	///Take the audio file input to translate to text
    const transcription = await openai.audio.transcriptions.create({
 		file: fs.createReadStream("/path/to/file/audio.mp3"),
   		model: "whisper-1",
        language: "en", // I put this just in case if we wanted it to be translated to english text so we don't need to use google translate, but just in case its here so you know what you have to change 
    });
    const originalLanguage = transcription.language;
    const transcriptionText = transcription.text;
    
    //Taking the transcription.text into chat gpt to provide a response to start conversation
    const completion = await openai.chat.completions.create({ 
        model: "gpt-4",
        messages: [ 
            { 
                role: "system", content: "You will give a response to the text to have a conversation ." // the system role is what the system is going to be doing so it just lets it know what the response needs to be about...
            }, 
            { 
                role: "user", 
                content: transcriptionText
            },         
                  ], 
    });
    const responseText = completion.choices[0].message.content;
    
    ///Taking the AI’s response into the original language with google cloud api
    const [translation] = await translate.translate(responseText, originalLanguage);
    
    ///Take the translated text into audio 
    const speechFile = path.resolve("./speech.mp3");
    const mp3 = await openai.audio.speech.create({
      audioConfig: { audioEncoding: "MP3" },
      voice: { languageCode: originalLanguage, ssmlGender: "NEUTRAL" },
      input: { text: translation },
    });
  
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    }
main()
