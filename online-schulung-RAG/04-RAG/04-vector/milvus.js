import { Milvus } from '@langchain/community/vectorstores/milvus';
import { OllamaEmbeddings } from "@langchain/ollama";
import { RunnableLambda } from "@langchain/core/runnables";


const collectionName = "rag_collection";
const embeddingsModel = "nomic-embed-text";
const milvusTextFieldMaxLength = 2_000;

const storeVectors = new RunnableLambda({
  async func(data) {
    const embeddings = new OllamaEmbeddings({
      model: embeddingsModel,
    });
    await Milvus.fromTexts(data.texts, data.metadata, embeddings, {
      collectionName,
      textFieldMaxLength: milvusTextFieldMaxLength, 
      url: "localhost:19530",
    });
  },
});

storeVectors.invoke({
  texts: ["Katze", "Hund", "Auto"],
  metadata: { source: "the internet" },
});
