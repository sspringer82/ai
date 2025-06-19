import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Milvus } from "@langchain/community/vectorstores/milvus";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";
import { OllamaEmbeddings } from "@langchain/ollama";
import { PerformanceObserver, performance } from "node:perf_hooks";

const chunkSize = 1000;
const chunkOverlap = 200;
const embeddingsModel = "nomic-embed-text";
const milvusTextFieldMaxLength = 2_000;
const collectionName = "rag_collection";
const inputFile = "../files/node.pdf";

const obs = new PerformanceObserver((items) => {
  console.log(
    `${items.getEntries()[0].name}: ${items.getEntries()[0].duration.toFixed(2)}ms`
  );
});
obs.observe({ type: "measure" });

const loadPDF = new RunnableLambda({
  async func(file) {
    console.log("Loading PDF");
    performance.mark("loading PDF");
    const loader = new PDFLoader(file, {
      splitPages: false,
    });
    const docs = await loader.load();
    console.log("PDF loaded");
    performance.measure("loading PDF", "loading PDF");
    return docs[0];
  },
});

const splitText = new RunnableLambda({
  async func(document) {
    console.log("Splitting text");
    performance.mark("splitting text");
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
    const texts = await splitter.splitText(document.pageContent);
    console.log("Text split");
    performance.measure("splitting text", "splitting text");
    return { texts, metadata: flattenObject(document.metadata) };
  },
});

const storeVectors = new RunnableLambda({
  async func(data) {
    console.log("Storing vectors");
    performance.mark("storing vectors");
    const embeddings = new OllamaEmbeddings({
      model: embeddingsModel,
    });
    await Milvus.fromTexts(data.texts, data.metadata, embeddings, {
      collectionName,
      textFieldMaxLength: milvusTextFieldMaxLength,
      url: "localhost:19530",
    });
    performance.measure("storing vectors", "storing vectors");
    console.log("Vectors stored");
  },
});

console.log("Starting sequence");
const sequence = RunnableSequence.from([loadPDF, splitText, storeVectors]);
await sequence.invoke(inputFile);
console.log("Sequence finished");

function flattenObject(obj, parentKey, result = {}) {
  for (const key in obj) {
    if (obj && obj.hasOwnProperty && obj.hasOwnProperty(key)) {
      const propName = parentKey ? `${parentKey}_${key}` : key;
      const value = obj[key];
      if (
        typeof value === "object" &&
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
