
import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Globe, 
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProjectConfig = () => {
  const [projectName, setProjectName] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [description, setDescription] = useState('');
  const [executionMode, setExecutionMode] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Configuration Panel */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-500" />
            <span>Configuração do Projeto</span>
          </CardTitle>
          <CardDescription>
            Configure sua automação RPA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-name">Nome do Projeto</Label>
            <Input
              id="project-name"
              placeholder="Ex: Automação Formulário Clientes"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-url">URL do Formulário</Label>
            <Input
              id="form-url"
              placeholder="https://exemplo.com/formulario"
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="execution-mode">Modo de Execução</Label>
            <Select value={executionMode} onValueChange={setExecutionMode}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o modo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sequential">Sequencial</SelectItem>
                <SelectItem value="parallel">Paralelo</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o objetivo da automação..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background/50 resize-none"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 rpa-gradient hover:opacity-90">
              <Play className="w-4 h-4 mr-2" />
              Iniciar Automação
            </Button>
            <Button variant="outline" size="icon">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Management Panel */}
      <div className="space-y-6">
        {/* Excel Upload */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-green-500" />
              <span>Arquivo de Dados</span>
            </CardTitle>
            <CardDescription>
              Faça upload do arquivo Excel com os dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-border transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Clique para selecionar ou arraste o arquivo aqui
              </p>
              <p className="text-xs text-muted-foreground">
                Formatos suportados: .xlsx, .xls, .csv
              </p>
              <Button variant="outline" className="mt-4">
                Selecionar Arquivo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Web Scraping Config */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-500" />
              <span>Configuração de Scraping</span>
            </CardTitle>
            <CardDescription>
              Configure os elementos a serem capturados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Seletor de Confirmação</Label>
              <Input
                placeholder="#protocolo, .confirmation-number"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Tempo de Espera (segundos)</Label>
              <Input
                type="number"
                placeholder="5"
                className="bg-background/50"
              />
            </div>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Testar Scraping
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectConfig;
