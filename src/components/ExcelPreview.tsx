
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

interface ExcelPreviewProps {
  data: any[];
}

const ExcelPreview = ({ data }: ExcelPreviewProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileSpreadsheet className="w-8 h-8 mx-auto mb-2" />
        <p>Nenhum dado para exibir</p>
      </div>
    );
  }

  const columns = Object.keys(data[0]);
  const previewData = data.slice(0, 3); // Mostra apenas os primeiros 3 registros

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              {columns.map((column, index) => (
                <th key={index} className="text-left p-2 font-medium text-muted-foreground">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-border/20">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-2 text-foreground">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length > 3 && (
        <div className="text-center p-3 bg-background/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Mostrando 3 de {data.length} registros. Todos os registros serão processados na automação.
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{columns.length} colunas detectadas</span>
        <span>{data.length} registros total</span>
      </div>
    </div>
  );
};

export default ExcelPreview;
