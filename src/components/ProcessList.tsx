import React from 'react';
import { FileText, Download, Loader } from 'lucide-react';
import { GeneratedProcess } from '../types';

interface ProcessListProps {
  processes: GeneratedProcess[];
}

export function ProcessList({ processes }: ProcessListProps) {
  const handleDownload = async (process: GeneratedProcess, fileType: 'pdf' | 'docx') => {
    if (process.status !== 'completed') return;
    
    try {
      // In a real app, you would use different endpoints for PDF/DOCX
      const fileExtension = fileType === 'pdf' ? '.pdf' : '.docx';
      const fileName = process.fileName.replace(/\.[^/.]+$/, '') + fileExtension;
      
      // Simulate file download - in a real app, this would be an API call
      const response = await fetch(`${process.downloadUrl}?type=${fileType}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Erro ao baixar o arquivo. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">
          Processos Gerados
        </h2>
        <div className="space-y-4">
          {processes.map((process) => (
            <div
              key={process.id}
              className="bg-white rounded-lg shadow-sm border border-primary-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <FileText size={20} className="text-primary-900" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-900">{process.title}</h3>
                    <p className="text-sm text-primary-600">
                      {new Date(process.createdAt).toLocaleDateString()} • {process.pages} páginas
                    </p>
                  </div>
                </div>
                {process.status === 'pending' ? (
                  <div className="flex items-center gap-2 text-primary-600">
                    <Loader size={20} className="animate-spin" />
                    <span className="text-sm">Gerando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(process, 'pdf')}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
                      disabled={process.status !== 'completed'}
                    >
                      <Download size={20} />
                      <span className="text-sm">Download</span>
                    </button>
                  </div>
                )}
              </div>
              {process.status === 'completed' && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleDownload(process, 'pdf')}
                    className="text-xs px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors flex items-center gap-1"
                  >
                    <Download size={14} />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownload(process, 'docx')}
                    className="text-xs px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors flex items-center gap-1"
                  >
                    <Download size={14} />
                    DOCX
                  </button>
                </div>
              )}
            </div>
          ))}
          {processes.length === 0 && (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-primary-200 mb-4" />
              <p className="text-primary-600">
                Nenhum processo gerado ainda. Inicie uma consulta para gerar processos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}