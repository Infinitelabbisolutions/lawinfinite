import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Chat } from '../types';

interface ProcessGeneratorProps {
  chat: Chat;
  onClose: () => void;
  onGenerate: (title: string, config: ProcessConfig) => void;
}

interface ProcessConfig {
  title: string;
  description: string;
  plaintiff: string;
  defendant: string;
  processType: string;
  urgency: string;
  aiModel: 'fast' | 'balanced' | 'thorough';
  maxPages: number;
  format: 'pdf' | 'docx' | 'both';
}

export function ProcessGenerator({ chat, onClose, onGenerate }: ProcessGeneratorProps) {
  const [formData, setFormData] = useState<ProcessConfig>({
    title: `Processo - ${chat.title}`,
    description: '',
    plaintiff: '',
    defendant: '',
    processType: 'civil',
    urgency: 'normal',
    aiModel: 'balanced',
    maxPages: 50,
    format: 'both'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData.title, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary-900">Gerar Novo Processo</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Título do Processo
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Autor
              </label>
              <input
                type="text"
                value={formData.plaintiff}
                onChange={(e) => setFormData({ ...formData, plaintiff: e.target.value })}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Réu
              </label>
              <input
                type="text"
                value={formData.defendant}
                onChange={(e) => setFormData({ ...formData, defendant: e.target.value })}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Tipo de Processo
              </label>
              <select
                value={formData.processType}
                onChange={(e) => setFormData({ ...formData, processType: e.target.value })}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="civil">Civil</option>
                <option value="criminal">Criminal</option>
                <option value="labor">Trabalhista</option>
                <option value="tax">Tributário</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Urgência
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgente</option>
                <option value="very-urgent">Muito Urgente</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Modelo de IA
              </label>
              <select
                value={formData.aiModel}
                onChange={(e) => setFormData({ ...formData, aiModel: e.target.value as 'fast' | 'balanced' | 'thorough' })}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="fast">Rápido (Menor precisão)</option>
                <option value="balanced">Balanceado</option>
                <option value="thorough">Minucioso (Maior precisão)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Formato de Saída
              </label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value as 'pdf' | 'docx' | 'both' })}
                className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="both">Ambos</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Limite de Páginas
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={formData.maxPages}
              onChange={(e) => setFormData({ ...formData, maxPages: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="mt-1 text-xs text-primary-500">
              Máximo de páginas para o documento gerado (1-10000)
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
            >
              Gerar Processo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}