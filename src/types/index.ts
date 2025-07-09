export type ModelProvider = 'openai' | 'gemini';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSettings {
  modelProvider: ModelProvider;
  apiKey: string;
}

export interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface APIError {
  message: string;
  code?: string;
} 