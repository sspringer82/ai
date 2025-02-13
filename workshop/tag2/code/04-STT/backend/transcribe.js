import { exec } from 'child_process';
import path from 'path';
import { readFile } from 'fs/promises';

const transcribeAudio = (audioPath) => {
  return new Promise((resolve, reject) => {
    const command = `whisper --output_format=json --task=transcribe --fp16=False --output_dir=./output --model=base --language=de ${path.resolve(
      audioPath
    )}`;
    console.log(command);
    const process = exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Fehler beim Ausführen von Whisper: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Whisper-Fehlerausgabe: ${stderr}`);
      }
      console.log(`Transkriptionsausgabe:\n${stdout}`);

      const parsedPath = path.parse(audioPath);
      const newFilePath = path.join('./output', `${parsedPath.name}.json`);
      const output = await readFile(newFilePath, 'utf-8');

      resolve(JSON.parse(output));
    });
  });
};

export default transcribeAudio;
