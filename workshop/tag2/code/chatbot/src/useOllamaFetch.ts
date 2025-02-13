import { useState } from 'react';
import { type UseFormReset } from 'react-hook-form';

type FormData = {
  text: string;
};

// Fetchcall zu Ollama und der Ollama API
export function useOllamaFetch(
  reset: UseFormReset<FormData>
): [string[], (data: FormData) => void] {
  const [content, setContent] = useState<string[]>([]);

  const onSubmit = async (data: FormData) => {
    const text = data.text;

    setContent((prevContent) => [...prevContent, data.text]);

    reset();

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: 'llama3.1',
        prompt: text,
      }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    setContent((prevContent) => [...prevContent, '']);

    while (true) {
      const { value, done } = await reader.read();

      if (done === true) {
        break;
      }

      const payload = JSON.parse(decoder.decode(value, { stream: true }));

      setContent((prevContent) => [
        ...prevContent.slice(0, -1),
        prevContent[prevContent.length - 1] + payload.response,
      ]);
    }
  };

  return [content, onSubmit];
}
