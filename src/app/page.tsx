'use client';

import { ModelProvider, Message } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ModelSelector from '../components/ModelSelector';
import ApiKeyManager from '../components/ApiKeyManager';
import ChatInterface from '../components/ChatInterface';

export default function Home() {
  const [modelProvider, setModelProvider] = useLocalStorage<ModelProvider>('chatbot-model', 'openai');
  const [openaiApiKey, setOpenaiApiKey] = useLocalStorage<string>('openai-api-key', '');
  const [geminiApiKey, setGeminiApiKey] = useLocalStorage<string>('gemini-api-key', '');
  const [messages, setMessages] = useLocalStorage<Message[]>('chatbot-messages', []);

  const currentApiKey = modelProvider === 'openai' ? openaiApiKey : geminiApiKey;
  const setCurrentApiKey = modelProvider === 'openai' ? setOpenaiApiKey : setGeminiApiKey;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI Chatbot
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Chat with OpenAI GPT-4o Mini or Gemini 1.5 Flash - Your API keys are stored securely in your browser
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1 space-y-6">
            <ModelSelector
              selectedModel={modelProvider}
              onModelChange={setModelProvider}
            />
            
            <ApiKeyManager
              modelProvider={modelProvider}
              apiKey={currentApiKey}
              onApiKeyChange={setCurrentApiKey}
            />
            
            {/* Status */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    modelProvider === 'openai' ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">
                    OpenAI {openaiApiKey ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    modelProvider === 'gemini' ? 'bg-purple-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">
                    Gemini {geminiApiKey ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="h-[700px]">
              <ChatInterface
                modelProvider={modelProvider}
                apiKey={currentApiKey}
                messages={messages}
                onMessagesChange={setMessages}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            🔒 Your API keys are stored locally in your browser and never sent to our servers.
          </p>
          <p className="mt-1">
            Built with Next.js, TypeScript, and Tailwind CSS | Updated with streaming support
          </p>
        </div>
      </div>
    </div>
  );
}
