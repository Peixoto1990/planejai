interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible';
    content: string;
  };
  diagnosis: {
    content: string;
  };
  suggestions: {
    items: string[];
  };
  extraIncome: {
    items: string[];
  };
  investment: {
    items: string[];
  };
  motivation: {
    content: string;
  };
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.6-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const callGeminiAPI = async (prompt: string): Promise<GeminiResponse> => {
  if (!API_KEY) {
    throw new Error('A chave da API do Gemini não foi configurada.');
  }

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `Erro na requisição: ${response.status}`;
    const parsedError = (() => {
      try {
        return JSON.parse(errorBody) as { error?: { message?: string } };
      } catch {
        return undefined;
      }
    })();

    if (parsedError?.error?.message) {
      errorMessage = parsedError.error.message;
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as GeminiResponse;
};

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt);
  const json = response.candidates[0]?.content.parts[0]?.text;
  if (!json) {
    throw new Error('A resposta da IA está vazia.');
  }

  return JSON.parse(json) as InsightData;
};

export const getChatMessage = async (prompt: string): Promise<string> => {
  const response = await callGeminiAPI(prompt);
  const message = response.candidates[0]?.content.parts
    .map((part) => part.text)
    .join(' ')
    .trim();

  if (!message) {
    throw new Error('A resposta da IA está vazia.');
  }

  return message;
};
