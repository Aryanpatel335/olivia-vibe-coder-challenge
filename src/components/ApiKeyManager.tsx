'use client';

import { useState } from 'react';
import { ModelProvider } from '../types';
import { validateApiKey } from '../utils/api';

interface ApiKeyManagerProps {
  modelProvider: ModelProvider;
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

export default function ApiKeyManager({
  modelProvider,
  apiKey,
  onApiKeyChange,
}: ApiKeyManagerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState(apiKey);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!validateApiKey(modelProvider, inputValue)) {
      setError(
        modelProvider === 'openai'
          ? 'Please enter a valid OpenAI API key (starts with sk-)'
          : 'Please enter a valid Gemini API key'
      );
      return;
    }

    setError('');
    onApiKeyChange(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    setError('');
    onApiKeyChange('');
  };

  const hasKey = apiKey.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {modelProvider === 'openai' ? 'OpenAI' : 'Gemini'} API Key
        </h3>
        <div className="flex items-center gap-2">
          {hasKey && (
            <span className="text-sm text-green-600 dark:text-green-400">
              ✓ Key saved
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            API Key
          </label>
          <div className="relative">
            <input
              type={isVisible ? 'text' : 'password'}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError('');
              }}
              placeholder={`Enter your ${modelProvider === 'openai' ? 'OpenAI' : 'Gemini'} API key`}
              className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isVisible ? '🙈' : '👁️'}
            </button>
          </div>
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save Key
          </button>
          {hasKey && (
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear Key
            </button>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            🔒 Your API key is stored securely in your browser&apos;s local storage and never sent to our servers.
          </p>
          <p className="mt-1">
            Get your API key from:{' '}
            <a
              href={
                modelProvider === 'openai'
                  ? 'https://platform.openai.com/api-keys'
                  : 'https://makersuite.google.com/app/apikey'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {modelProvider === 'openai' ? 'OpenAI Platform' : 'Google AI Studio'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 