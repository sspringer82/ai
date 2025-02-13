import { encoding_for_model } from "tiktoken";

const textDecoder = new TextDecoder();

async function countTokens(text) {
    const encoding = await encoding_for_model('gpt-4');
    const tokens = encoding.encode(text);
    const firstToken = tokens[1];
    const decodedToken = textDecoder.decode(new Uint8Array([firstToken]));
    console.log(`First token: ${firstToken}, Decoded: ${decodedToken}`);
    return tokens.length;
}

const text = 'Donaudampfschifffahrtsgesellschaftskapitän';
const tokenCount = await countTokens(text);
console.log(tokenCount);