import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

export function getServer() {
  const server = new McpServer({
    name: 'mcp-server',
    version: '1.0.0',
  });

  server.tool(
    'currency-converter',
    'Convert currency between EUR and USD',
    {
      amount: z.number(),
      from: z.enum(['EUR', 'USD']),
      to: z.enum(['EUR', 'USD']),
    },
    async ({ amount, from, to }) => {
      const exchangeRate =
        from === 'EUR' && to === 'USD'
          ? 1.1
          : from === 'USD' && to === 'EUR'
          ? 0.91
          : 1;
      const convertedAmount = amount * exchangeRate;
      return {
        content: [
          {
            type: 'text',
            text: `${amount} ${from} is ${convertedAmount.toFixed(2)} ${to}`,
          },
        ],
      };
    }
  );

  server.resource(
    'price-list',
    // 'price-list://products',
    new ResourceTemplate('price-list://products/{category}', {
      list: undefined,
    }),
    async (uri, { category }) => {
      const priceList = [
        { name: 'Apple', category: 'Fruit', price: 1.2 },
        { name: 'Banana', category: 'Fruit', price: 0.8 },
        { name: 'Carrot', category: 'Vegetable', price: 0.5 },
        { name: 'Bread', category: 'Bakery', price: 2.5 },
        { name: 'Milk', category: 'Dairy', price: 1.5 },
      ];

      const filteredList =
        category !== 'all'
          ? priceList.filter(
              (item) => item.category.toLowerCase() === category.toLowerCase()
            )
          : priceList;

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(filteredList),
            json: filteredList,
          },
        ],
      };
    }
  );

  server.prompt(
    'get-product-description-prompt',
    {
      productName: z.string().describe('The name of the product.'),
      length: z
        .enum(['short', 'medium', 'long'])
        .optional()
        .describe('The desired length of the description.'),
    },
    async (input) => {
      const { productName, length } = input;

      let promptInstructions = `Please generate a compelling product description.`;

      let promptCore = `The product is named "${productName}". `;
      promptCore += `Focus on its general benefits and appeal. `;

      let refinements = '';

      if (length) {
        let lengthGuidance = '';
        if (length === 'short')
          lengthGuidance = 'Keep it concise, around 1-2 sentences. ';
        if (length === 'medium')
          lengthGuidance = 'Aim for a paragraph of about 3-5 sentences. ';
        if (length === 'long')
          lengthGuidance =
            'Provide a detailed description, potentially multiple paragraphs. ';
        refinements += lengthGuidance;
      }

      const fullPrompt = `${promptInstructions}\n\nProduct Details:\n${promptCore}\n\nStyle and Constraints:\n${refinements.trim()}`;

      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: fullPrompt,
            },
          },
        ],
      };
    }
  );

  return server;
}
