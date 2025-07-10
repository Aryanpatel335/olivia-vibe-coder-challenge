'use client';

import { useState, useRef, useEffect } from 'react';
import { Message, ModelProvider } from '../types';
import { callOpenAIStream, callGeminiStream } from '../utils/api';

interface ChatInterfaceProps {
  modelProvider: ModelProvider;
  apiKey: string;
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
}

export default function ChatInterface({
  modelProvider,
  apiKey,
  messages,
  onMessagesChange,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !apiKey || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    onMessagesChange(newMessages);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingMessage('');

    try {
      const assistantMessageId = (Date.now() + 1).toString();
      
      // Use streaming for both providers
      if (modelProvider === 'openai') {
        const openAIMessages = newMessages.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        }));

        const streamGenerator = callOpenAIStream(
          {
            model: 'gpt-4o-mini',
            messages: openAIMessages,
          },
          apiKey
        );

        let fullResponse = '';
        for await (const chunk of streamGenerator) {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        }

        const assistantMessage: Message = {
          id: assistantMessageId,
          role: 'assistant',
          content: fullResponse,
          timestamp: new Date(),
        };

        onMessagesChange([...newMessages, assistantMessage]);
      } else {
        // Gemini streaming
        const geminiMessages = newMessages.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        }));

        const streamGenerator = callGeminiStream(geminiMessages, apiKey);

        let fullResponse = '';
        for await (const chunk of streamGenerator) {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        }

        const assistantMessage: Message = {
          id: assistantMessageId,
          role: 'assistant',
          content: fullResponse,
          timestamp: new Date(),
        };

        onMessagesChange([...newMessages, assistantMessage]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: new Date(),
      };
      onMessagesChange([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingMessage('');
    }
  };

  const handleClearChat = () => {
    onMessagesChange([]);
  };

  const canSendMessage = apiKey && input.trim() && !isLoading;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Chat with {modelProvider === 'openai' ? 'OpenAI GPT-4o Mini' : 'Gemini 1.5 Flash'}
        </h3>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <div className="text-4xl mb-2">💬</div>
            <p>Start a conversation with your AI assistant!</p>
            <p className="text-sm mt-1">
              Make sure you have entered your API key above.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-1 opacity-75 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Streaming message */}
        {isStreaming && streamingMessage && (
          <div className="flex justify-start">
            <div className="max-w-[70%] bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3">
              <div className="whitespace-pre-wrap text-sm">{streamingMessage}</div>
              <div className="text-xs mt-1 opacity-75 text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="animate-pulse">●</div>
                  <span>Typing...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && !isStreaming && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Thinking...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              apiKey
                ? "Type your message..."
                : "Please enter your API key first"
            }
            disabled={!apiKey || isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!canSendMessage}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
} 