import { useCallback, useState } from 'react';

import { buildChatPrompt, type ChatMessageData } from '@/data/chatPrompt';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { getChatMessage } from '@/services/aiService';

const initialMessage: ChatMessageData = {
  role: 'assistant',
  content: 'Olá! Posso ajudar você a entender melhor este planejamento financeiro.',
};

export function useChat(simulationId: string) {
  const { getFormData } = useSimulationStorage();
  const [messages, setMessages] = useState<ChatMessageData[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (question: string) => {
      const simulation = getFormData(simulationId);
      if (!simulation) {
        setError('Simulação não encontrada.');
        return;
      }

      const userMessage: ChatMessageData = { role: 'user', content: question };
      const conversation = [...messages, userMessage];
      setMessages(conversation);
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildChatPrompt({ simulation, messages: conversation, question });
        const response = await getChatMessage(prompt);
        setMessages((currentMessages) => [
          ...currentMessages,
          { role: 'assistant', content: response },
        ]);
      } catch {
        setError('Erro ao responder sua pergunta. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [getFormData, messages, simulationId]
  );

  return { messages, isLoading, error, sendMessage };
}
