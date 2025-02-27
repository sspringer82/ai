import ollama from "ollama";

function getWeatherForCity({ city }) {
  switch (city) {
    case "Berlin":
      return "Sunny 10°C";
    case "New York":
      return "Cloudy 14°C";
    case "Los Angeles":
      return "Rainy 16°C";
    default:
      return "Unknown";
  }
}

let messages = [
  {
    role: 'system',
    content: 'You are a helpful AI that can use a weather service to get the current weather for a city. ',
  },
  {
    role: "user",
    content: "What is the current weather in New York?",
  },
];

const response = await ollama.chat({
  model: 'llama3.2',
  messages: messages,
  tools: [
    {
      type: "function",
      function: {
        name: "get_weather_for_city",
        description: "Get the current weather for a city",
        parameters: {
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "The city to get the weather for",
            },
          },
          required: ["city"],
        },
      },
    },
  ],
});
messages.push(response.message);

if (!response.message.tool_calls || response.message.tool_calls.length === 0) {
  console.log("The model didn't use the function. Its response was:");
  console.log(response.message.content);
} else if (response.message.tool_calls) {
  const availableFunctions = {
    get_weather_for_city: getWeatherForCity,
  };
  for (const tool of response.message.tool_calls) {
    const functionToCall = availableFunctions[tool.function.name];
    const functionResponse = functionToCall(tool.function.arguments);
    messages.push({
      role: "tool",
      content: `Answer from the weather service: ${functionResponse}`,
    });
  }
}

console.log("messages", messages);
const finalResponse = await ollama.chat({
  model: 'llama3.2',
  messages: messages,
});
console.log(finalResponse.message.content);
