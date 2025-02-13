import { createInterface } from 'readline/promises';
import ollama from 'ollama';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const memory = [
  {
    role: 'system',
    content:
      'Only explain the meaning of colors. Answer precise and compact in only one sentence. If the question does not contain a color, answer with "I do not know the meaning of this color."',
  },
];

async function chat() {
  const content = await rl.question('Input: ');
  if (content === 'exit') {
    rl.close();
    return;
  }

  const userMessage = { role: 'user', content };
  memory.push(userMessage);
  const response = await ollama.chat({
    model: 'llama3.2',
    messages: memory,
  });
  memory.push(response.message);
  console.log(response.message);
  chat();
}

chat();