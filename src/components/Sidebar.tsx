import React from 'react';
import { MessageSquare, Plus, Scale } from 'lucide-react';
import { Chat } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chats: Chat[];
  currentChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  onNewChat: () => void;
  isDemo: boolean;
  onLogoClick: () => void;
}

export function Sidebar({
  isOpen,
  chats,
  currentChat,
  onChatSelect,
  onNewChat,
  isDemo,
  onLogoClick
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div
          onClick={onLogoClick}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity mb-4"
        >
          <Scale className="h-6 w-6 text-primary-600" />
          <span className="font-semibold text-primary-900">Assistente Jurídico</span>
        </div>
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
        >
          <Plus size={20} />
          Nova Consulta
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`w-full text-left p-3 rounded-lg mb-1 flex items-center gap-3 ${
              currentChat?.id === chat.id
                ? 'bg-primary-50 text-primary-900'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <MessageSquare size={20} className={currentChat?.id === chat.id ? 'text-primary-600' : 'text-gray-400'} />
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{chat.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(chat.createdAt).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>

      {isDemo && (
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Versão demonstrativa
          </p>
        </div>
      )}
    </div>
  );
}