import { RunnableLambda } from "@langchain/core/runnables";
import * as cheerio from 'cheerio';

const loadPDF = new RunnableLambda({
  async func({url, selector = 'body'}) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    const data = await response.text();
    const $ = cheerio.load(data);

    console.log(arguments)

    const text = $(selector).text().trim();

    return text;
  },
});

const data = await loadPDF.invoke({url: 'https://de.wikipedia.org/wiki/Katzen', selector: '.mw-body-content'});
console.log(data);
