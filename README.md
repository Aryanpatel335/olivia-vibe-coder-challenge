# AI Chatbot - OpenAI & Gemini

A modern chatbot application built with Next.js 15, TypeScript, and Tailwind CSS for the Olivia Vibe Coder Challenge. Chat with OpenAI GPT-4o Mini or Google Gemini 1.5 Flash models with real-time streaming responses.

## ✨ Features

- **🤖 Dual AI Support**: Choose between OpenAI GPT-4o Mini and Google Gemini 1.5 Flash
- **🔒 Secure**: API keys stored locally in your browser, never sent to our servers
- **⚡ Real-time Streaming**: Live response streaming for both OpenAI and Gemini
- **📱 Responsive Design**: Works beautifully on desktop and mobile
- **🌙 Dark Mode**: Automatic dark/light mode support
- **💾 Persistent Storage**: Chat history and settings saved locally
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (from [OpenAI Platform](https://platform.openai.com/api-keys))
- Gemini API key (from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd olivia-vibe-coder-challenge
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **Select AI Model**: Choose between OpenAI GPT-4o Mini or Gemini 1.5 Flash
2. **Enter API Key**: Input your API key securely (stored locally)
3. **Start Chatting**: Type your message and watch the AI respond in real-time

## 🛠️ Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: 
  - OpenAI API with streaming
  - Google Generative AI SDK with streaming
- **State Management**: React hooks with localStorage persistence

## 🔧 Architecture

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ApiKeyManager.tsx
│   ├── ModelSelector.tsx
│   └── ChatInterface.tsx
├── hooks/           # Custom React hooks
│   └── useLocalStorage.ts
├── types/           # TypeScript type definitions
│   └── index.ts
└── utils/           # Utility functions
    └── api.ts       # API integration
```

## 🔐 Security

- **Client-side Only**: No backend server required
- **Local Storage**: API keys never leave your browser
- **No Data Collection**: All conversations stored locally
- **Secure Headers**: Proper CORS and security headers

## 🎯 API Models

### OpenAI GPT-4o Mini
- **Model**: `gpt-4o-mini`
- **Features**: Fast, cost-effective, high-quality responses
- **Streaming**: Full support with real-time updates

### Google Gemini 1.5 Flash
- **Model**: `gemini-1.5-flash-latest`
- **Features**: Ultra-fast, powerful multimodal AI
- **Streaming**: Native streaming support

## 🚀 Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment

The app is fully client-side and doesn't require any environment variables. API keys are managed through the UI and stored in localStorage.

## 📝 License

This project is part of the Olivia Vibe Coder Challenge.

---

Built with ❤️ using Next.js, TypeScript, and modern AI APIs
