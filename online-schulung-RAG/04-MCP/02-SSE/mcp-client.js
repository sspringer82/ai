import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

const client = new Client(
  {
    name: 'example-client',
    version: '1.0.0',
  },
  {
    capabilities: {},
  }
);

const transport = new SSEClientTransport(new URL('http://localhost:8080/sse'));
await client.connect(transport);

const resourceResult = await client.readResource({
  uri: 'price-list://products/Fruit',
});
console.log('Resource fetched:');
console.log(resourceResult);
