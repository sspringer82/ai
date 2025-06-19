import { RunnableLambda } from "@langchain/core/runnables";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loadPdf = new RunnableLambda({
    async func(fileName) {
        const loader = new PDFLoader(fileName, {splitPages: false});
        const docs = await loader.load();
        return docs[0];
    }
})

const data = await loadPdf.invoke('../files/react.pdf')
console.log(data.metadata);