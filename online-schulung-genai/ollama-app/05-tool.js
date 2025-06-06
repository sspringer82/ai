import ollama from 'ollama';

function getWeatherForCity({ city }) {
  switch (city) {
    case 'Berlin':
      return 'Sunny';
    case 'New York':
      return 'Cloudy';
    case 'Los Angeles':
      return 'Rainy';
    default:
      return 'Unknown';
  }
}

async function run(model) {
  let messages = [
    {
      role: 'user',
      content: 'What is the weather in New York?',
    },
  ];

  const response = await ollama.chat({
    model: model,
    messages: messages,
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather_for_city',
          description: 'Get the current weather for a city',
          parameters: {
            type: 'object',
            properties: {
              city: {
                type: 'string',
                description: 'The city to get the weather for',
              },
            },
            required: ['city'],
          },
        },
      },
    ],
  });

  messages.push(response.message);

  if (
    !response.message.tool_calls ||
    response.message.tool_calls.length === 0
  ) {
    console.log("The model didn't use the function. Its response was:");
    console.log(response.message.content);
    return;
  }

  if (response.message.tool_calls) {
    console.log(response.message.tool_calls);
    console.log(response.message.tool_calls[0].function.arguments);
    const availableFunctions = {
      get_weather_for_city: getWeatherForCity,
    };
    for (const tool of response.message.tool_calls) {
      const functionToCall = availableFunctions[tool.function.name];
      const functionResponse = functionToCall(tool.function.arguments);
      console.log('functionResponse', functionResponse);
      // Add function response to the conversation
      messages.push({
        role: 'tool',
        content: functionResponse,
      });
    }
  }

  const finalResponse = await ollama.chat({
    model: model,
    messages: messages,
  });
  console.log(finalResponse.message.content);
}

run('llama3.2').catch((error) => console.error('An error occurred:', error));
