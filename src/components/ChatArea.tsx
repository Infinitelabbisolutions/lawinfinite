import React, { useState } from 'react';
import { FileText, Pencil, Trash2 } from 'lucide-react';
import { Chat } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ProcessGenerator } from './ProcessGenerator';

interface ChatAreaProps {
  chat: Chat;
  onGenerateProcess: (chat: Chat, processTitle: string) => void;
  onSendMessage: (chatId: string, content: string, attachments?: File[]) => void;
  onTitleChange: (chatId: string, newTitle: string) => void;
  onDeleteChat: (chatId: string) => void;
  isDemo?: boolean;
}

export function ChatArea({ 
  chat, 
  onGenerateProcess, 
  onSendMessage, 
  onTitleChange,
  onDeleteChat,
  isDemo 
}: ChatAreaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const [showProcessForm, setShowProcessForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onTitleChange(chat.id, title.trim());
      setIsEditing(false);
    }
  };

  const handleSendMessage = (content: string, attachments?: File[]) => {
    onSendMessage(chat.id, content, attachments);
  };

  const handleDelete = () => {
    onDeleteChat(chat.id);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          {isEditing ? (
            <form onSubmit={handleTitleSubmit} className="flex-1 mr-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Digite o título da conversa"
                autoFocus
                onBlur={handleTitleSubmit}
              />
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-primary-900">{chat.title}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
              >
                <Pencil size={16} />
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setShowProcessForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
            >
              <FileText size={18} />
              <span>Gerar Processo</span>
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
              title="Excluir conversa"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {chat.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isBot={message.role === 'assistant'}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} />

      {showProcessForm && (
        <ProcessGenerator
          chat={chat}
          onClose={() => setShowProcessForm(false)}
          onGenerate={(title) => {
            onGenerateProcess(chat, title);
            setShowProcessForm(false);
          }}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Confirmar exclusão
            </h3>
            <p className="text-primary-600 mb-6">
              Tem certeza que deseja excluir esta conversa? Os processos gerados serão mantidos.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}