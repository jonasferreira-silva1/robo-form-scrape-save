
import React, { useState } from 'react';
import { 
  Save, 
  FolderOpen, 
  Plus, 
  Trash2, 
  Copy,
  Clock,
  Globe,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Template {
  id: string;
  name: string;
  description: string;
  formUrl: string;
  executionMode: string;
  createdAt: string;
  lastUsed: string;
  usageCount: number;
}

const TemplateManager = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Formulário Clientes',
      description: 'Template para cadastro automático de clientes',
      formUrl: 'https://exemplo.com/clientes',
      executionMode: 'sequential',
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20',
      usageCount: 15
    },
    {
      id: '2', 
      name: 'Cadastro Fornecedores',
      description: 'Automação para cadastro de fornecedores',
      formUrl: 'https://sistema.com/fornecedores',
      executionMode: 'parallel',
      createdAt: '2024-01-10',
      lastUsed: '2024-01-18',
      usageCount: 8
    }
  ]);

  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveTemplate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: templateName,
      description: templateDescription,
      formUrl: 'https://exemplo.com/form',
      executionMode: 'sequential',
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    
    setTemplates([...templates, newTemplate]);
    setTemplateName('');
    setTemplateDescription('');
    setIsDialogOpen(false);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleUseTemplate = (template: Template) => {
    // Aqui seria a lógica para carregar o template na configuração
    console.log('Usando template:', template);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Templates Salvos</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie seus templates de automação para reutilização rápida
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rpa-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Salvar como Template</DialogTitle>
              <DialogDescription>
                Salve a configuração atual como um template para reutilização
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Nome do Template</Label>
                <Input
                  id="template-name"
                  placeholder="Ex: Formulário Clientes"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-desc">Descrição</Label>
                <Input
                  id="template-desc"
                  placeholder="Descreva o uso deste template..."
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveTemplate} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Template
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-base">{template.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleUseTemplate(template)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-xs">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Globe className="w-3 h-3" />
                <span className="truncate">{template.formUrl}</span>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Usado {template.usageCount}x</span>
                <span>{template.lastUsed}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleUseTemplate(template)}
              >
                <FolderOpen className="w-3 h-3 mr-2" />
                Usar Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateManager;
