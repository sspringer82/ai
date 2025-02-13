import { useState } from 'react';
import { type UseFormReset } from 'react-hook-form';
import OpenAI from 'openai';

type FormData = {
  text: string;
};

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'theKey',
  dangerouslyAllowBrowser: true,
});

export function useOpenAi(
  reset: UseFormReset<FormData>
): [string[], (data: FormData) => void] {
  const [content, setContent] = useState<string[]>([]);

  const onSubmit = async (data: FormData) => {
    const text = data.text;

    setContent((prevContent) => [...prevContent, data.text]);

    reset();

    const stream = await client.chat.completions.create({
      model: 'mistral-nemo',
      messages: [{ role: 'user', content: text }],
      stream: true,
    });

    setContent((prevContent) => [...prevContent, '']);

    for await (const chunk of stream) {
      setContent((prevContent) => [
        ...prevContent.slice(0, -1),
        prevContent[prevContent.length - 1] + chunk.choices[0]?.delta?.content,
      ]);
    }
  };

  return [content, onSubmit];
}
