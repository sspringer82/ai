import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
const model = "nomic-embed-text";

const embeddings = new OllamaEmbeddings({
  model,
});

const vectorStore = new MemoryVectorStore(embeddings);

const documents = [
    { id: 1, pageContent: "Dogs are known for their loyalty and playful nature, making them great companions.", metadata: { source: "the internet" } },
    { id: 2, pageContent: "Cats are independent and curious creatures that love exploring their surroundings.", metadata: { source: "the internet" } },
    { id: 3, pageContent: "Horses have been trusted partners of humans for centuries, excelling in both work and sport.", metadata: { source: "the internet" } }
];

await vectorStore.addDocuments(documents);

const result = await vectorStore.similaritySearch('Poodle', 1, (doc) => doc.metadata.source === 'the internet');
console.log(result);


const retriever = vectorStore.asRetriever({
    searchType: 'mmr', // mmr: erst viele mit simmilarity, ranken, dann top k resultate (gegen redundanzen)
    searchKwargs: {
        fetchK: 10
    },
    filter: (doc) => doc.metadata.source === 'the internet',
    k: 1
})

const retrieved = await retriever.invoke('Maine Coon');
console.log(retrieved);