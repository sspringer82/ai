import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import { createAgent } from 'langchain';
import { z } from 'zod';

// ==========================================
// 1. TOOL DEFINITION
// ==========================================
const weatherTool = tool(
  async ({ city }) => {
    const weatherMap = {
      Berlin: 'Sunny 10°C',
      'New York': 'Cloudy 14°C',
      'Los Angeles': 'Rainy 16°C',
    };
    return weatherMap[city] || 'Unknown';
  },
  {
    name: 'get_weather_for_city',
    description: 'Get the current weather for a given city name',
    schema: z.object({
      city: z.string().describe('The city to query (e.g., Berlin, New York)'),
    }),
  },
);

// ==========================================
// 2. AGENT INITIALIZATION
// ==========================================
const model = new ChatOpenAI({
  configuration: {
    baseURL: 'http://localhost:11434/v1',
  },
  apiKey: 'ollama',
  model: 'llama3.2:1b',
});

const agent = createAgent({
  model,
  tools: [weatherTool],
});

// ==========================================
// 3. EXECUTION
// ==========================================
async function main() {
  const result = await agent.invoke({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful AI that can use a weather service. If the tool returns "Unknown", tell the user "I don\'t know".',
      },
      {
        role: 'user',
        content: 'What is the current weather in Los Angeles?',
      },
    ],
  });

  const finalAnswer = result.messages[result.messages.length - 1];
  console.log(`AI: ${finalAnswer.content}`);
}

main().catch(console.error);
