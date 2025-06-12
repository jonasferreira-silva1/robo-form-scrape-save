import React, { useState } from "react";
import {
  Save,
  FolderOpen,
  Plus,
  Trash2,
  Copy,
  Clock,
  Globe,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

const fetchTemplates = async () => {
  const res = await fetch("http://localhost:8000/templates");
  if (!res.ok) throw new Error("Erro ao buscar templates");
  return res.json();
};

const createTemplate = async (template) => {
  const res = await fetch("http://localhost:8000/templates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(template),
  });
  if (!res.ok) throw new Error("Erro ao criar template");
  return res.json();
};

const TemplateManager = () => {
  const queryClient = useQueryClient();
  const {
    data: templates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
  });
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      setTemplateName("");
      setTemplateDescription("");
      setIsDialogOpen(false);
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Carregando templates...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar templates.
      </div>
    );
  }

  const handleSaveTemplate = () => {
    mutation.mutate({
      name: templateName,
      description: templateDescription,
      form_url: "https://exemplo.com/form", // Pode ser dinâmico
      execution_mode: "sequential", // Pode ser dinâmico
    });
  };

  const handleDeleteTemplate = (id: string) => {
    // Futuramente: enviar para API
    console.log("Template deletado:", id);
  };

  const handleUseTemplate = (template: Template) => {
    // Aqui seria a lógica para carregar o template na configuração
    console.log("Usando template:", template);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Templates Salvos
          </h2>
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
                <Button
                  onClick={handleSaveTemplate}
                  className="flex-1"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    "Salvando..."
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={mutation.isPending}
                >
                  Cancelar
                </Button>
              </div>
            </div>
            {mutation.isError && (
              <div className="text-red-500 mt-2">Erro ao salvar template.</div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {!templates || templates.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
          Nenhum template cadastrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
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
      )}
    </div>
  );
};

export default TemplateManager;
