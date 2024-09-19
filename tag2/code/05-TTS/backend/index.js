// server.js
import express from 'express';
import path from 'path';
import fs from 'fs';
import OpenAI from 'openai';

const app = express();
const port = 3000;

// Statische Dateien aus dem 'public'-Verzeichnis bereitstellen
app.use(express.static('public'));

// Middleware zum Parsen von JSON-Anfragen
app.use(express.json());

// OpenAI-Client initialisieren
const openai = new OpenAI({
  baseURL: 'http://localhost:8000/v1/',
  apiKey: 'theKey', // Ersetzen Sie 'theKey' durch Ihren tatsächlichen API-Schlüssel
});

// Route für POST /tts
app.post('/tts', async (req, res) => {
  try {
    const text = req.body.text;

    // Sprachausgabe mit OpenAI generieren
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'ryan',
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // MP3-Datei als Antwort senden
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="speech.mp3"',
    });

    res.send(buffer);
  } catch (error) {
    console.error('Fehler bei der Sprachgenerierung:', error);
    res.status(500).send('Fehler bei der Sprachgenerierung');
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
