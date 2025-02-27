import { Milvus } from "@langchain/community/vectorstores/milvus";
import { Runnable, RunnableLambda } from "@langchain/core/runnables";
import { OllamaEmbeddings } from "@langchain/ollama";
const embeddingsModel = "nomic-embed-text";
const collectionName = "rag_collection";

const retrieve = new RunnableLambda({
  async func(text) {
    const embeddings = new OllamaEmbeddings({
      model: embeddingsModel,
    });

    const vectorStore = new Milvus(embeddings, {
      collectionName,
      url: "localhost:19530",
    });

    const retriever = vectorStore.asRetriever(10);

    const result = await retriever.invoke(text);
    return result;
  },
});

const result = await retrieve.invoke("What lifecycle hooks are available in React?");
console.log(result);