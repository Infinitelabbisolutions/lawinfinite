import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: File[]) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleFileSelect = (files: File[]) => {
    setAttachments([...attachments, ...files]);
  };

  const handleRemoveFile = (file: File) => {
    setAttachments(attachments.filter(f => f !== file));
  };

  return (
    <div className="border-t border-primary-100">
      <div className="p-4">
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFiles={attachments}
          onRemoveFile={handleRemoveFile}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 pt-0">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-4 py-2 rounded-full border border-primary-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-primary-900 text-white hover:bg-primary-800 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}