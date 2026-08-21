import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/shared/Button';

interface ChatFormProps {
  isLoading?: boolean;
  onSubmitMessage: (message: string) => void;
}

export function ChatForm({ isLoading = false, onSubmitMessage }: ChatFormProps) {
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onSubmitMessage(trimmedMessage);
    setMessage('');
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className=" min-h-12 flex items-center gap-2">
        <div className="min-h-full flex items-center rounded-2xl bg-input shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] w-[92%]">
          <textarea
            id="chatTextArea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Faça sua pergunta para o assistente"
            rows={1}
            disabled={isLoading}
            className="overflow-hidden focus:outline-0 px-4 py-4 rounded-2xl w-full bg-input resize-none"
          />
        </div>
        <Button
          iconSize={30}
          variant="primary"
          icon={ArrowUpRight}
          className="w-[8%] min-h-full"
          type="submit"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
