import { encoding_for_model } from 'tiktoken';

const encoder = encoding_for_model('gpt-4o');

const text = 'Beispieltext, um die Anzahl der Tokens zu berechnen.';

const tokens = encoder.encode(text);
console.log(tokens.length);
