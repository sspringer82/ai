import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['server.js'],
});

const client = new Client({
  name: 'mcp-client',
  version: '1.0.0',
});

await client.connect(transport);

// ----- list resources -----
const resources = await client.listResources();
console.log(JSON.stringify(resources));

// ----- read resources -----
const resourceResult = await client.readResource({
  uri: 'price-list://products/Fruit',
});
console.log('Result:', resourceResult);

// ----- list tools -----
const tools = await client.listTools();
console.log(JSON.stringify(tools));

// ----- call tool -----
const toolResult = await client.callTool({
  name: 'currency-converter',
  arguments: {
    amount: 100,
    from: 'EUR',
    to: 'USD',
  },
});
console.log('Tool Result:', toolResult);

// ----- list prompts -----
const prompts = await client.listPrompts();
console.log(JSON.stringify(prompts));

// ----- get prompt -----
const promptResult = await client.getPrompt({
  name: 'get-product-description-prompt',
  arguments: {
    productName: 'Banana',
    length: 'short',
  },
});
console.log('Prompt Result:', promptResult.messages[0].content);

client.close();
