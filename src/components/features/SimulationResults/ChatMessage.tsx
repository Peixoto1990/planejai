import { MessageCircle } from 'lucide-react';

import type { ChatMessageData } from '@/data/chatPrompt';

interface ChatMessageProps extends ChatMessageData {
  content: string;
  role: 'user' | 'assistant';
}

export function ChatMessage({ content, role }: ChatMessageProps) {
  const isUserMessage = role === 'user';
  const senderLabel = isUserMessage ? 'Você' : 'Resposta da IA';

  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div className="flex max-w-[85%] flex-col gap-1.5">
        <div
          className={`text-muted-foreground flex items-center gap-1.5 text-xs font-semibold ${
            isUserMessage ? 'justify-end' : 'justify-start'
          }`}
        >
          <MessageCircle size={28} />
          <span>{senderLabel}</span>
        </div>
        <div
          className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
            isUserMessage
              ? 'border-primary bg-primary text-primary-foreground rounded-br-sm'
              : 'border-border bg-secondary-button text-foreground rounded-bl-sm'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
