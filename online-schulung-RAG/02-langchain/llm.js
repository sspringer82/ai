import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOllama({
    model: 'llama3.2'
})

const parser = new StringOutputParser();

const systemTemplate = 'Translate the following into {language}';
const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', '{text}']
]);

const llmChain = await promptTemplate.pipe(model).pipe(parser);

const result = await llmChain.invoke({language: 'english', text: 'Katze'});
console.log(result);