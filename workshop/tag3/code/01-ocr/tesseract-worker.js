const { createWorker } = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const numWorkers = 4; // Anzahl der Worker
const totalPages = 100; // Gesamtzahl der Seiten
const workers = [];
const results = [];

(async () => {
  // Worker initialisieren
  for (let i = 0; i < numWorkers; i++) {
    const worker = createWorker({
      logger: (m) => console.log(`Worker ${i + 1}:`, m),
    });
    await worker.load();
    await worker.loadLanguage('deu');
    await worker.initialize('deu');
    workers.push(worker);
  }

  // Seiten aufteilen und verarbeiten
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pagesPerWorker = Math.ceil(pages.length / numWorkers);
  const workerPromises = workers.map((worker, index) => {
    const workerPages = pages.slice(
      index * pagesPerWorker,
      (index + 1) * pagesPerWorker
    );
    return (async () => {
      for (const page of workerPages) {
        const pageNumber = String(page).padStart(3, '0');
        const imageFile = `page${pageNumber}.jpg`;
        const imagePath = path.resolve(__dirname, imageFile);

        try {
          const {
            data: { text },
          } = await worker.recognize(imagePath);
          results[page - 1] = text;
          console.log(`Worker ${index + 1}: Seite ${page} verarbeitet.`);
        } catch (err) {
          console.error(`Fehler beim Verarbeiten von Seite ${page}:`, err);
          results[page - 1] = '';
        }
      }
    })();
  });

  // Warten, bis alle Worker fertig sind
  await Promise.all(workerPromises);

  // Worker terminieren
  for (const worker of workers) {
    await worker.terminate();
  }

  // Ergebnisse zusammenfügen
  const fullText = results.join('\n\n=== Neue Seite ===\n\n');

  // Ergebnis speichern
  fs.writeFileSync('output.txt', fullText, 'utf-8');
  console.log(
    'Alle Seiten verarbeitet und Ergebnis in output.txt gespeichert.'
  );
})();
