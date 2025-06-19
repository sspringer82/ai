import { RunnableLambda } from "@langchain/core/runnables";
import { readFile } from 'fs/promises';
import {markdownToTxt} from 'markdown-to-txt';

const loadMD = new RunnableLambda({
  async func(file) {
    try {
        const content = await readFile(file, 'utf-8');
        return markdownToTxt(content);
      } catch (error) {
        console.error('Error reading file:', error);
      }
  },
});

const data = await loadMD.invoke("../files/ollama.api.md");
console.log(data);