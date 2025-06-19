console.log('Sending request to the LLM');
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'llama3.2',
    prompt: 'Was bedeutet die Farbe blau, in einem Satz?',
  }),
});
console.log(`Response is ${response.ok ? 'OK' : 'NOT OK'}`);

const decoder = new TextDecoder('utf-8');

for await (const chunk of response.body) {
  const data = decoder.decode(chunk, { stream: true });
  const obj = JSON.parse(data);
  process.stdout.write(obj.response);
}
