import type { SimulationRecord } from './simulation';

export type ChatMessageRole = 'user' | 'assistant';

export interface ChatMessageData {
  content: string;
  role: ChatMessageRole;
}

export interface ChatContext {
  simulation: SimulationRecord;
  messages: ChatMessageData[];
  question: string;
}

export function buildChatPrompt({ simulation, messages, question }: ChatContext): string {
  const conversation = messages
    .map(({ role, content }) => `${role === 'user' ? 'Usuário' : 'Assistente'}: ${content}`)
    .join('\n');

  return `
    Você é um educador financeiro especializado em finanças pessoais e o assistente do PlanejAI.
    Responda à pergunta do usuário com linguagem clara, didática, prática e encorajadora.
    Fale em segunda pessoa e considere os dados da simulação como contexto, sem inventar informações.

    Dados da simulação:
    - Renda Mensal Bruta: ${simulation.income}
    - Custos Fixos Essenciais: ${simulation.expenses}
    - Dívidas e Parcelas Mensais: ${simulation.debts}
    - Meta: ${simulation.goalName}
    - Custo da Meta: ${simulation.goalAmount}
    - Prazo Desejado: ${simulation.goalDeadline} meses

    Histórico da conversa:
    ${conversation || 'Nenhuma mensagem anterior.'}

    Nova pergunta do usuário:
    ${question}

    Regras:
    - Responda apenas com a mensagem para o usuário, sem JSON e sem prefácios técnicos.
    - Escreva em Português do Brasil.
    - Não use Markdown, listas extensas ou emojis.
    - Seja objetivo e não repita o histórico sem necessidade.
  `;
}
