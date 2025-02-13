import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1', // Standardport von Ollama
  apiKey: 'ollama', // Ollama benötigt keine echte API-Key-Authentifizierung
});

async function askOllama(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'llama3.2', 
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    
    console.log('Antwort von Ollama:', response.choices[0].message.content);
  } catch (error) {
    console.error('Fehler bei der Anfrage:', error);
  }
}

askOllama('Erkläre kurz, wie ein neuronales Netz funktioniert.');