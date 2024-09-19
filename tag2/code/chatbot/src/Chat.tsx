import { useForm } from 'react-hook-form';
import './Chat.css';
import { useOpenAiFetch } from './useOpenAiFetch';
// import { useOllamaFetch } from './useOllamaFetch';
// import { useOllama } from './useOllama';

type FormData = {
  text: string;
};

const Chat: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  // const [content, onSubmit] = useOllamaFetch(reset);
  // const [content, onSubmit] = useOllama(reset);
  const [content, onSubmit] = useOpenAiFetch(reset);

  return (
    <div className="container">
      <div className="column left"></div>
      <div className="column center">
        <div className="content">
          {content.map((text, index) => (
            <div key={index} className="chatMessage">
              {text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              rows={4}
              placeholder="Enter your prompt here..."
              {...register('text')}
            ></textarea>
            <button type="submit">go</button>
          </form>
        </div>
      </div>
      <div className="column right"></div>
    </div>
  );
};

export default Chat;
