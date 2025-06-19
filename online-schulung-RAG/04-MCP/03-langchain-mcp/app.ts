import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatOllama } from '@langchain/ollama';

const client = new MultiServerMCPClient({
  throwOnLoadError: true,
  prefixToolNameWithServerName: false,
  additionalToolNamePrefix: '',
  mcpServers: {
    'mcp-server': {
      url: 'http://localhost:8080/mcp',
    },
  },
});

const tools = await client.getTools();

const model = new ChatOllama({
  model: 'llama3.2',
});

const agent = createReactAgent({
  llm: model,
  tools,
});

try {
  const currency = await agent.invoke({
    messages: [
      {
        role: 'user',
        content: 'I have 100 EUR. How much is that in USD?',
      },
    ],
  });

  console.log('Currency conversion result:', currency);
} catch (error) {
  console.error('Error during currency conversion:', error);
  process.exit(1);
}
