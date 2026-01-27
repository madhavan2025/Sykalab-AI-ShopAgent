// Curated list of top models from Vercel AI Gateway
export const DEFAULT_CHAT_MODEL = "google/gemini-2.5-flash-lite";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
 
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Chatbot 4.5",
    provider: "anthropic",
    description: "Fast and affordable, great for ecommerce sites",
  },
 
];


