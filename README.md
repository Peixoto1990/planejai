# PlanejAI

Aplicação web de planejamento financeiro desenvolvida como projeto final do bootcamp **Santander 2026 - Front-End React AI**.

O PlanejAI permite que o usuário simule uma meta financeira, visualize um diagnóstico personalizado gerado por inteligência artificial e consulte suas simulações anteriores em uma página de histórico.

## Sobre o projeto

O projeto foi proposto e estruturado pela professora ao longo do bootcamp. A maior parte da aplicação foi disponibilizada como base para a turma, com o desafio de cada aluno desenvolver funcionalidades complementares.

Neste projeto, desenvolvi individualmente a página de **histórico de simulações**, incluindo a leitura dos dados salvos, listagem, visualização e remoção de registros.

Também desenvolvi a funcionalidade de **chat com a IA**. Para agilizar essa etapa, utilizei o GitHub Copilot como ferramenta de apoio na organização do fluxo, criação dos componentes, elaboração do prompt, integração com a API Gemini e tratamento dos estados de loading e erro. A implementação, as decisões de integração e a validação do resultado foram realizadas dentro do projeto.

## Funcionalidades

- Criação de simulações financeiras a partir de renda, custos, dívidas, meta, valor e prazo.
- Cálculo da economia mensal necessária para atingir a meta.
- Geração de insight financeiro personalizado pela API do Google Gemini.
- Classificação da viabilidade da meta: viável, ajuste necessário ou inviável no prazo.
- Diagnóstico financeiro, sugestões práticas, ideias de renda extra e sugestões de investimento.
- Página de histórico de simulações, visualização e remoção de registros.
- Chat contextual com a IA, considerando os dados da simulação e o histórico da conversa.
- Mensagens diferenciadas para usuário e IA, com loading, erros e scroll automático.
- Persistência das simulações e insights no `localStorage`.
- Histórico do chat mantido apenas em memória, sem persistência no `localStorage`.
- Tema claro e escuro e layout responsivo para mobile e desktop.

## Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Google Gemini API
- React Loading Skeleton
- ESLint e Prettier

## Arquitetura

```text
src/
├── components/
│   ├── features/
│   │   ├── Insights/
│   │   ├── Simulation/
│   │   ├── SimulationHistory/
│   │   └── SimulationResults/
│   ├── layout/
│   └── shared/
├── context/theme/
├── data/
│   ├── aiPrompt.ts
│   ├── chatPrompt.ts
│   └── simulation.ts
├── hooks/
│   ├── useChat.tsx
│   ├── useInsight.tsx
│   └── useSimulationStorage.tsx
├── pages/
├── services/aiService.ts
├── styles/
└── utils/
```

### Fluxo principal

1. O usuário preenche o formulário de simulação.
2. Os dados são salvos no `localStorage` com um identificador único.
3. A aplicação calcula e exibe os resultados da simulação.
4. O insight financeiro é solicitado ao Gemini e salvo junto da simulação.
5. O usuário pode acessar o histórico e abrir qualquer simulação existente.
6. No resultado, o usuário envia perguntas pelo chat.
7. O chat monta um prompt com a simulação e as mensagens locais e exibe a resposta da IA.

## Rotas

| Rota             | Descrição                            |
| ---------------- | ------------------------------------ |
| `/`              | Formulário para criar uma simulação  |
| `/resultado/:id` | Resultado e insight de uma simulação |
| `/historico`     | Histórico de simulações salvas       |

## Como executar

### Pré-requisitos

- Node.js 20 ou superior
- npm
- Uma chave de API do Google Gemini

### Instalação

```bash
git clone https://github.com/Peixoto1990/planejai
cd planejai
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_do_gemini
```

O serviço utiliza o modelo `gemini-3.6-flash` por padrão. Para sobrescrever o modelo, adicione opcionalmente:

```env
VITE_GEMINI_MODEL=nome-do-modelo
```

Nunca versione o arquivo `.env.local` nem compartilhe sua chave de API.

### Desenvolvimento

```bash
npm run dev
```

Depois, acesse a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Scripts disponíveis

```bash
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # executa o typecheck e gera o build de produção
npm run lint      # executa o ESLint
npm run format    # formata os arquivos com Prettier
npm run preview   # serve o build de produção localmente
```

## Persistência de dados

As simulações são armazenadas no navegador usando a chave `simulation-data` do `localStorage`. Cada registro possui um identificador, a data de criação, os dados preenchidos e, quando disponível, o insight gerado pela IA.

As mensagens do chat não são persistidas. Elas existem apenas enquanto a página de resultados está montada e são perdidas quando o usuário recarrega a página ou sai da simulação.

## Integração com a IA

A integração com o Gemini está centralizada em `src/services/aiService.ts`:

- `getInsight`: solicita o diagnóstico financeiro estruturado em JSON.
- `getChatMessage`: solicita uma resposta textual para o chat.

Os prompts ficam separados em arquivos próprios:

- `src/data/aiPrompt.ts`: prompt do insight financeiro.
- `src/data/chatPrompt.ts`: prompt contextual do chat.

O prompt do chat recebe os dados da simulação, o histórico local e a nova pergunta do usuário. A resposta é exibida pelo componente `ChatMessage`.

## Créditos e uso de ferramentas de IA

Este projeto foi desenvolvido como parte do bootcamp Santander 2026 - Front-End React AI, a partir da base e das orientações fornecidas pela professora.

- A página de histórico de simulações foi criada individualmente por mim.
- O chat com a IA foi desenvolvido por mim com apoio do GitHub Copilot para agilizar a implementação de componentes, hooks, prompt, integração com a API e tratamento de estados.
- A utilização da ferramenta de apoio não substituiu a revisão, adaptação e validação do código no contexto do projeto.

## Próximos passos

- Persistir o histórico do chat quando essa funcionalidade fizer parte do escopo do produto.
- Adicionar testes automatizados para os fluxos de simulação, histórico e chat.
- Melhorar o tratamento de respostas interrompidas e limites de uso da API.
- Avaliar a criação de um backend para proteger a chave da API em produção.

## Status

Projeto acadêmico concluído como entrega final do bootcamp, com foco em React, TypeScript, consumo de API de inteligência artificial, persistência local e construção de interfaces responsivas.
