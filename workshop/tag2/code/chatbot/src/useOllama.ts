import { useState } from 'react';
import { type UseFormReset } from 'react-hook-form';
import ollama from 'ollama';

type FormData = {
  text: string;
};

export function useOllama(
  reset: UseFormReset<FormData>
): [string[], (data: FormData) => void] {
  const [content, setContent] = useState<string[]>([]);

  const onSubmit = async (data: FormData) => {
    const text = data.text;

    setContent((prevContent) => [...prevContent, data.text]);

    reset();

    const response = await ollama.generate({
      model: 'mistral-nemo',
      prompt: text,
      stream: true,
    });

    setContent((prevContent) => [...prevContent, '']);

    for await (const chunk of response) {
      setContent((prevContent) => [
        ...prevContent.slice(0, -1),
        prevContent[prevContent.length - 1] + chunk.response,
      ]);
    }
  };

  return [content, onSubmit];
}
