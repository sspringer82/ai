import Tesseract from 'tesseract.js';

console.time('seite');
const {
  data: { text },
} = await Tesseract.recognize('input2.jpg', 'deu', {
  // logger: (m) => console.log(m),
});
console.timeEnd('seite');

console.log(text);
