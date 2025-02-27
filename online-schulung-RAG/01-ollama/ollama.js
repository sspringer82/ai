import ollama from 'ollama';

const response = await ollama.chat({
  model: 'llama3.2',
  messages: [
    {role: 'system', content: 'Antworte immer sehr kompakt und präzise in einem einzigen Satz'},
    { role: 'user', content: 'Was ist eine Katze?' },
  ],
  stream: true,
});

for await (const chunk of response) {
  process.stdout.write(chunk.message.content);
}
