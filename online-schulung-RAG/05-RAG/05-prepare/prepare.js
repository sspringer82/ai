import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Milvus } from '@langchain/community/vectorstores/milvus';
import { RunnableLambda, RunnableSequence } from '@langchain/core/runnables';
import { OllamaEmbeddings } from '@langchain/ollama';

const chunkSize = 1000;
const chunkOverlap = 200;
const embeddingsModel = 'nomic-embed-text';
const milvusTextFieldMaxLength = 2_000;
const collectionName = 'rag_collection';
const inputFile = '../files/node.pdf';

const loadPDF = new RunnableLambda({
  async func (file) {
    const loader = new PDFLoader(file, {
      splitPages: false,
    });
    const docs = await loader.load();
    return docs[0];
  },
});

const splitText = new RunnableLambda({
  async func (document) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
    const texts = await splitter.splitText(document.pageContent);
    return { texts, metadata: flattenObject(document.metadata) };
  },
});


const storeVectors = new RunnableLambda({
  async func(data) {
    const embeddings = new OllamaEmbeddings({
      model: embeddingsModel,
    });
    await Milvus.fromTexts(data.texts, data.metadata, embeddings, {
      collectionName,
      textFieldMaxLength: milvusTextFieldMaxLength,
      url: 'localhost:19530',
    });
  },
});

const sequence = RunnableSequence.from([loadPDF, splitText, storeVectors]);
await sequence.invoke(inputFile);

function flattenObject(
  obj,
  parentKey,
  result= {}
) {
  for (const key in obj) {
    if (obj && obj.hasOwnProperty && obj.hasOwnProperty(key)) {
      const propName = parentKey ? `${parentKey}_${key}` : key;
      const value = obj[key];
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flattenObject(value, propName, result);
      } else {
        result[propName] = value;
      }
    }
  }
  return result;
}
