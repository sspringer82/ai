import ollama from 'ollama';

// Simulates an API call to get flight times
// In a real application, this would fetch data from a live database or API
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
  // Initialize conversation with a user query
  let messages = [
    {
      role: 'user',
      content: 'What is the weather in New York?',
    },
  ];

  // First API call: Send the query and function description to the model
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
  // Add the model's response to the conversation history
  messages.push(response.message);

  // Check if the model decided to use the provided function
  if (
    !response.message.tool_calls ||
    response.message.tool_calls.length === 0
  ) {
    console.log("The model didn't use the function. Its response was:");
    console.log(response.message.content);
    return;
  }

  // Process function calls made by the model
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

  // Second API call: Get final response from the model
  const finalResponse = await ollama.chat({
    model: model,
    messages: messages,
  });
  console.log(finalResponse.message.content);
}

run('mistral-nemo').catch((error) =>
  console.error('An error occurred:', error)
);
