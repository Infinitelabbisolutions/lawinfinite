import React, { useRef, useState } from 'react';
import { FileUp, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (file: File) => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB per file
const SUPPORTED_FORMATS = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

export function FileUpload({ onFileSelect, selectedFiles, onRemoveFile }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setError('Formato de arquivo não suportado');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Arquivo muito grande (máximo 100MB)');
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(validateFile);
      
      if (validFiles.length > 0) {
        onFileSelect(validFiles);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 text-sm text-primary-900 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <FileUp size={16} />
          Anexar Documentos
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
      </div>
      
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      
      {selectedFiles.length > 0 && (
        <div className="mt-2 space-y-2">
          {selectedFiles.map((file) => (
            <div key={file.name} className="flex items-center justify-between p-2 bg-primary-50 rounded-lg">
              <div className="flex flex-col flex-1 min-w-0 mr-2">
                <span className="text-sm text-primary-700 truncate">{file.name}</span>
                <span className="text-xs text-primary-500">{formatFileSize(file.size)}</span>
              </div>
              <button
                onClick={() => onRemoveFile(file)}
                className="p-1 text-primary-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}