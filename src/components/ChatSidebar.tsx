import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { ChatSession } from '../types';

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeSessionId: number;
  onSessionSelect: (sessionId: number) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ sessions, activeSessionId, onSessionSelect, onNewChat }: ChatSidebarProps) {
  return (
    <div className="w-64 bg-primary-50 border-r border-primary-100 flex flex-col h-full">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
        >
          <Plus size={20} />
          Nova Conversa
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSessionSelect(session.id)}
            className={`w-full text-left p-4 hover:bg-primary-100 transition-colors ${
              activeSessionId === session.id ? 'bg-primary-100' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <MessageSquare size={20} className="text-primary-400 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-primary-900 truncate">{session.title}</h3>
                <p className="text-sm text-primary-600 truncate">{session.lastMessage}</p>
                <span className="text-xs text-primary-400">
                  {session.timestamp.toLocaleDateString()}
                </span>
              </div>
              {session.unreadCount && (
                <span className="px-2 py-1 text-xs bg-primary-900 text-white rounded-full">
                  {session.unreadCount}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}