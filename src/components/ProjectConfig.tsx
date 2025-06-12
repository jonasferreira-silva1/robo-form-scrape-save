import React, { useState, useRef } from "react";
import {
  Upload,
  FileSpreadsheet,
  Globe,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  CheckCircle,
  X,
  Eye,
  AlertCircle,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "@/components/FileUpload";
import ExcelPreview from "@/components/ExcelPreview";

const ProjectConfig = () => {
  const [projectName, setProjectName] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [description, setDescription] = useState("");
  const [executionMode, setExecutionMode] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [isConfigValid, setIsConfigValid] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Futuramente: ler dados reais do Excel e setar em excelData
    setExcelData([]);
    checkConfigValidity();
  };

  const checkConfigValidity = () => {
    const isValid = projectName && formUrl && executionMode && uploadedFile;
    setIsConfigValid(!!isValid);
  };

  React.useEffect(() => {
    checkConfigValidity();
  }, [projectName, formUrl, executionMode, uploadedFile]);

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
            Configure sua automação RPA passo a passo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-name">Nome do Projeto *</Label>
            <Input
              id="project-name"
              placeholder="Ex: Automação Formulário Clientes"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-url">URL do Formulário *</Label>
            <Input
              id="form-url"
              placeholder="https://exemplo.com/formulario"
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              URL do site onde o robô irá preencher os formulários
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="execution-mode">Modo de Execução *</Label>
            <Select value={executionMode} onValueChange={setExecutionMode}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o modo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sequential">
                  <div className="flex flex-col">
                    <span>Sequencial</span>
                    <span className="text-xs text-muted-foreground">
                      Um registro por vez
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="parallel">
                  <div className="flex flex-col">
                    <span>Paralelo</span>
                    <span className="text-xs text-muted-foreground">
                      Múltiplos registros simultâneos
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="scheduled">
                  <div className="flex flex-col">
                    <span>Agendado</span>
                    <span className="text-xs text-muted-foreground">
                      Execução programada
                    </span>
                  </div>
                </SelectItem>
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

          <div className="flex items-center space-x-2 p-3 rounded-lg bg-background/30">
            {isConfigValid ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">
                  Configuração válida
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">
                  Preencha os campos obrigatórios (*)
                </span>
              </>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              className="flex-1 rpa-gradient hover:opacity-90"
              disabled={!isConfigValid}
            >
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
              <span>Arquivo de Dados *</span>
            </CardTitle>
            <CardDescription>
              Faça upload do arquivo Excel com os dados para preenchimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onFileSelect={handleFileUpload} />

            {uploadedFile && (
              <div className="mt-4 p-3 rounded-lg bg-background/30 border border-green-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">
                      {uploadedFile.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setUploadedFile(null);
                      setExcelData([]);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {excelData.length} registros encontrados
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Excel Preview */}
        {excelData.length > 0 && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-500" />
                <span>Preview dos Dados</span>
              </CardTitle>
              <CardDescription>
                Primeiros registros do arquivo Excel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExcelPreview data={excelData} />
            </CardContent>
          </Card>
        )}

        {/* Web Scraping Config */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-500" />
              <span>Configuração de Scraping</span>
            </CardTitle>
            <CardDescription>
              Configure os elementos a serem capturados após o preenchimento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Seletor de Confirmação</Label>
              <Input
                placeholder="#protocolo, .confirmation-number, .success-message"
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Seletor CSS do elemento que contém a confirmação
              </p>
            </div>
            <div className="space-y-2">
              <Label>Tempo de Espera (segundos)</Label>
              <Input
                type="number"
                placeholder="5"
                defaultValue="5"
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Tempo para aguardar o carregamento da página
              </p>
            </div>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Testar Configuração
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectConfig;
