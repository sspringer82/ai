import { useState } from 'react';
import { type UseFormReset } from 'react-hook-form';

type FormData = {
  text: string;
};

export function useOpenAiFetch(
  reset: UseFormReset<FormData>
): [string[], (data: FormData) => void] {
  const [content, setContent] = useState<string[]>([]);

  const onSubmit = async (data: FormData) => {
    const text = data.text;

    setContent((prevContent) => [...prevContent, data.text]);

    reset();

    const response = await fetch('http://localhost:11434/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer theKey',
      },
      method: 'POST',
      body: JSON.stringify({
        model: 'mistral-nemo',
        stream: true,
        messages: [
          // { role: 'user', content: 'Was ist die Hauptstadt von Frankreich?' },
          // {
          //   role: 'assistant',
          //   content: 'Die Hauptstadt von Frankreich ist Paris',
          // },
          { role: 'user', content: text },
        ],
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

      const payload = JSON.parse(
        decoder.decode(value, { stream: true }).substring(6)
      );

      console.log(payload);

      setContent((prevContent) => [
        ...prevContent.slice(0, -1),
        prevContent[prevContent.length - 1] + payload.choices[0].delta.content,
      ]);
    }
  };

  return [content, onSubmit];
}
