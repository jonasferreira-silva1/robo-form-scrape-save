
import React, { useRef, useState } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
        onFileSelect(file);
      } else {
        alert('Por favor, selecione um arquivo Excel (.xlsx, .xls) ou CSV (.csv)');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
        isDragOver 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-border/50 hover:border-border'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-4 rounded-full transition-colors ${
          isDragOver ? 'bg-blue-500/20' : 'bg-background/50'
        }`}>
          <FileSpreadsheet className={`w-8 h-8 transition-colors ${
            isDragOver ? 'text-blue-500' : 'text-muted-foreground'
          }`} />
        </div>
        
        <div>
          <p className="text-sm text-foreground mb-2 font-medium">
            {isDragOver ? 'Solte o arquivo aqui' : 'Clique para selecionar ou arraste o arquivo'}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Formatos suportados: .xlsx, .xls, .csv
          </p>
          <p className="text-xs text-muted-foreground">
            Máximo: 10MB
          </p>
        </div>
        
        <Button variant="outline" type="button" onClick={(e) => e.stopPropagation()}>
          <Upload className="w-4 h-4 mr-2" />
          Selecionar Arquivo
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
