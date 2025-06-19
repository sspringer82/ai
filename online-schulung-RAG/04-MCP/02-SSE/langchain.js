import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { loadMcpTools } from '@langchain/mcp-adapters';
import { ChatOllama } from '@langchain/ollama';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { tool } from '@langchain/core/tools';

// Initialize the ChatOpenAI model

const model = new ChatOllama({ model: 'llama3.2' });

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

try {
  // Connect to the transport
  await client.connect(transport);

  const tools = await loadMcpTools('currency-converter', client, {
    throwOnLoadError: true,
    prefixToolNameWithServerName: false,
    additionalToolNamePrefix: '',
  });

  // console.log(await tools[0].func({ from: 'USD', to: 'EUR', amount: 10 }));

  // Create and run the agent
  const agent = createReactAgent({ llm: model, tools });
  const agentResponse = await agent.invoke({
    messages: [
      { role: 'user', content: 'I have 10 Euros how much is that in USD?' },
    ],
  });
  console.log(agentResponse);
} catch (e) {
  console.error(e);
} finally {
  // Clean up connection
  await client.close();
}
