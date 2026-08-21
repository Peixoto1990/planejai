import 'react-loading-skeleton/dist/skeleton.css';

import { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Divider } from '@/components/shared/Divider';
import { useChat } from '@/hooks/useChat';
import { useInsight } from '@/hooks/useInsight';

import { Content } from '../Insights/Content';
import { Error } from '../Insights/Error';
import { ChatForm } from './ChatForm';
import { ChatMessage } from './ChatMessage';

interface AIInsightCardProps {
  simulationId: string;
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  const {
    messages,
    isLoading: isChatLoading,
    error: chatError,
    sendMessage,
  } = useChat(simulationId);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isChatLoading]);

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => fetchInsight(simulationId)}
        />
      )}
      {!isLoading && insight && !error && (
        <>
          <Content insight={insight} />
          <Divider orientation="horizontal" />
          <div
            ref={chatContainerRef}
            className="scrollbar-thin mt-4 flex max-h-64 flex-col gap-3 overflow-y-auto pr-1 [scrollbar-color:var(--border)_transparent] lg:max-h-93 lg:pr-2"
          >
            {messages.map((message, index) => (
              <ChatMessage key={`${message.role}-${index}`} {...message} />
            ))}
            {isChatLoading && (
              <p
                className="bg-input text-muted-foreground w-fit rounded-2xl rounded-bl-sm px-4 py-3 text-sm"
                aria-live="polite"
              >
                Assistente está pensando...
              </p>
            )}
          </div>
          {chatError && <p className="text-red-600 mt-3 text-sm">{chatError}</p>}
          <Divider orientation="horizontal" />
          <ChatForm isLoading={isChatLoading} onSubmitMessage={sendMessage} />
        </>
      )}
    </div>
  );
}
