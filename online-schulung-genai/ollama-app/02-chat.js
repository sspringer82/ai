import { createInterface } from 'readline/promises';
import ollama from 'ollama';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function chat() {
  const content = await rl.question('Input: ');
  if (content === 'exit') {
    rl.close();
    return;
  }
  const response = await ollama.chat({
    model: 'llama3.2',
    messages: [{ role: 'user', content }],
  });
  console.log(response.message.content);
  chat();
}

chat();