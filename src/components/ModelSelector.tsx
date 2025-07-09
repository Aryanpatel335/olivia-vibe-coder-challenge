'use client';

import { ModelProvider } from '../types';

interface ModelSelectorProps {
  selectedModel: ModelProvider;
  onModelChange: (model: ModelProvider) => void;
}

export default function ModelSelector({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) {
  const models = [
    {
      id: 'openai' as ModelProvider,
      name: 'OpenAI',
      description: 'GPT-4o Mini - Fast and cost-effective',
      icon: '🤖',
    },
    {
      id: 'gemini' as ModelProvider,
      name: 'Gemini',
      description: 'Gemini 1.5 Flash - Ultra-fast Google AI',
      icon: '⚡',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Select AI Model
      </h3>
      
      <div className="space-y-2">
        {models.map((model) => (
          <label
            key={model.id}
            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
              selectedModel === model.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <input
              type="radio"
              name="model"
              value={model.id}
              checked={selectedModel === model.id}
              onChange={() => onModelChange(model.id)}
              className="sr-only"
            />
            <div className="flex items-center flex-1">
              <span className="text-2xl mr-3">{model.icon}</span>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {model.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {model.description}
                </div>
              </div>
            </div>
            {selectedModel === model.id && (
              <div className="text-blue-500 ml-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
} 