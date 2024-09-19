import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import transcribeAudio from './transcribe.js';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const result = await transcribeAudio(`./${req.file.path}`);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
