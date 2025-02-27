import { InMemoryChatMessageHistory } from '@langchain/core/chat_history';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  RunnableSequence,
  RunnableWithMessageHistory,
} from '@langchain/core/runnables';
import { ChatOllama } from '@langchain/ollama';

const messageHistories = {};

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    'You are a helpful AI. Please explain the following colors in one sentence each.',
  ],
  ['placeholder', '{chat_history}'],
  ['human', '{input}'],
]);

const model = new ChatOllama({
  model: 'llama3.2',
});

const parser = new StringOutputParser();

const chain = RunnableSequence.from([
    prompt, 
    model, 
    parser
]);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: 'input',
  historyMessagesKey: 'chat_history',
});

const config = {
  configurable: {
    sessionId: 'theSession',
  },
};

const messages = [
  new HumanMessage('Hey AI, I want to know more about colors.'),
  new AIMessage("Sure! Let's start with the first color"),
];

const stream = await withMessageHistory.stream(
  {
    chat_history: messages,
    input: 'red',
  },
  config
);
for await (const chunk of stream) {
  process.stdout.write(chunk);
}

const stream2 = await withMessageHistory.stream(
    {
      chat_history: messages,
      input: 'green',
    },
    config
  );
  for await (const chunk of stream2) {
    process.stdout.write(chunk);
  }
