import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'} items-start mb-4 animate-fade-in`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-primary-600' : 'bg-primary-900'
      }`}>
        {isBot ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white" />}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isBot ? 'bg-gray-100' : 'bg-primary-900 text-white'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}