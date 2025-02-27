import { Ollama } from '@langchain/ollama';
import { loadSummarizationChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

const filePath = './docs/Ch2.pdf';

const loader = new PDFLoader(filePath);
const pdf = await loader.load();
const text = pdf.map((doc) => doc.pageContent).join('\n\n');

const model = new Ollama({ model: 'llama3.2' });
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

const chain = loadSummarizationChain(model);
const res = await chain.invoke({
  input_documents: docs,
});
console.log({ res });
