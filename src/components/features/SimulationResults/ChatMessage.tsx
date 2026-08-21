import type { ChatMessageData } from '@/data/chatPrompt';

interface ChatMessageProps extends ChatMessageData {
  content: string;
  role: 'user' | 'assistant';
}

export function ChatMessage({ content, role }: ChatMessageProps) {
  const isUserMessage = role === 'user';

  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUserMessage
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-input text-foreground rounded-bl-sm'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
