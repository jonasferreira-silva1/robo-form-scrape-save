
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Settings,
  Globe,
  FileSpreadsheet,
  Play,
  AlertCircle,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import FileUpload from '@/components/FileUpload';

const ConfigWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    projectName: '',
    description: '',
    formUrl: '',
    executionMode: '',
    uploadedFile: null as File | null,
    selectors: {
      nameField: '',
      emailField: '',
      phoneField: '',
      submitButton: ''
    },
    schedule: {
      enabled: false,
      frequency: '',
      time: ''
    }
  });

  const steps = [
    {
      id: 0,
      title: 'Informações Básicas',
      description: 'Configure o nome e descrição do seu projeto',
      icon: Settings
    },
    {
      id: 1,
      title: 'URL do Formulário',
      description: 'Informe a URL onde o robô deve preencher os dados',
      icon: Globe
    },
    {
      id: 2,
      title: 'Arquivo de Dados',
      description: 'Faça upload do arquivo Excel com os dados',
      icon: FileSpreadsheet
    },
    {
      id: 3,
      title: 'Configuração de Campos',
      description: 'Mapeie os campos do formulário',
      icon: Wand2
    },
    {
      id: 4,
      title: 'Agendamento (Opcional)',
      description: 'Configure execução automática',
      icon: Play
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (file: File) => {
    setWizardData({ ...wizardData, uploadedFile: file });
  };

  const handleFinish = () => {
    console.log('Configuração finalizada:', wizardData);
    // Aqui seria implementada a lógica para salvar a configuração
  };

  const isStepValid = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return wizardData.projectName && wizardData.description;
      case 1:
        return wizardData.formUrl;
      case 2:
        return wizardData.uploadedFile;
      case 3:
        return wizardData.selectors.nameField && wizardData.selectors.submitButton;
      case 4:
        return true; // Agendamento é opcional
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Nome do Projeto *</Label>
              <Input
                id="project-name"
                placeholder="Ex: Automação Formulário Clientes"
                value={wizardData.projectName}
                onChange={(e) => setWizardData({...wizardData, projectName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                placeholder="Descreva o objetivo desta automação..."
                value={wizardData.description}
                onChange={(e) => setWizardData({...wizardData, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="execution-mode">Modo de Execução</Label>
              <Select 
                value={wizardData.executionMode} 
                onValueChange={(value) => setWizardData({...wizardData, executionMode: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o modo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sequential">Sequencial</SelectItem>
                  <SelectItem value="parallel">Paralelo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="form-url">URL do Formulário *</Label>
              <Input
                id="form-url"
                placeholder="https://exemplo.com/formulario"
                value={wizardData.formUrl}
                onChange={(e) => setWizardData({...wizardData, formUrl: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                URL completa do site onde o robô irá preencher os formulários
              </p>
            </div>
            
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-500">Dica:</p>
                  <p className="text-muted-foreground">
                    Certifique-se de que a URL está acessível e que o formulário não requer autenticação especial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <FileUpload onFileSelect={handleFileUpload} />
            
            {wizardData.uploadedFile && (
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Arquivo carregado com sucesso!</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {wizardData.uploadedFile.name}
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Configure os seletores CSS para cada campo do formulário. Isso ajuda o robô a identificar onde inserir cada informação.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name-selector">Campo Nome *</Label>
                <Input
                  id="name-selector"
                  placeholder="#nome, .name-field, input[name='nome']"
                  value={wizardData.selectors.nameField}
                  onChange={(e) => setWizardData({
                    ...wizardData, 
                    selectors: {...wizardData.selectors, nameField: e.target.value}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-selector">Campo Email</Label>
                <Input
                  id="email-selector"
                  placeholder="#email, .email-field, input[type='email']"
                  value={wizardData.selectors.emailField}
                  onChange={(e) => setWizardData({
                    ...wizardData, 
                    selectors: {...wizardData.selectors, emailField: e.target.value}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone-selector">Campo Telefone</Label>
                <Input
                  id="phone-selector"
                  placeholder="#telefone, .phone-field, input[name='telefone']"
                  value={wizardData.selectors.phoneField}
                  onChange={(e) => setWizardData({
                    ...wizardData, 
                    selectors: {...wizardData.selectors, phoneField: e.target.value}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="submit-selector">Botão Enviar *</Label>
                <Input
                  id="submit-selector"
                  placeholder="#enviar, .submit-btn, button[type='submit']"
                  value={wizardData.selectors.submitButton}
                  onChange={(e) => setWizardData({
                    ...wizardData, 
                    selectors: {...wizardData.selectors, submitButton: e.target.value}
                  })}
                />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-500">Como encontrar seletores?</p>
                  <p className="text-muted-foreground">
                    Use as ferramentas de desenvolvedor do navegador (F12) para inspecionar os elementos do formulário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enable-schedule"
                checked={wizardData.schedule.enabled}
                onChange={(e) => setWizardData({
                  ...wizardData,
                  schedule: {...wizardData.schedule, enabled: e.target.checked}
                })}
                className="rounded"
              />
              <Label htmlFor="enable-schedule">Habilitar agendamento automático</Label>
            </div>
            
            {wizardData.schedule.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select 
                    value={wizardData.schedule.frequency} 
                    onValueChange={(value) => setWizardData({
                      ...wizardData,
                      schedule: {...wizardData.schedule, frequency: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensalmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={wizardData.schedule.time}
                    onChange={(e) => setWizardData({
                      ...wizardData,
                      schedule: {...wizardData.schedule, time: e.target.value}
                    })}
                  />
                </div>
              </div>
            )}
            
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-500">Configuração quase pronta!</p>
                  <p className="text-muted-foreground">
                    Revise suas configurações e clique em "Finalizar" para criar sua automação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isValid = isStepValid(index);
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex flex-col items-center space-y-2 ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted || (isCurrent && isValid)
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isCurrent
                    ? 'border-blue-500 text-blue-500'
                    : 'border-border text-muted-foreground'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-medium ${
                    isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  isCompleted ? 'bg-blue-500' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {React.createElement(steps[currentStep].icon, { className: "w-5 h-5 text-blue-500" })}
            <span>{steps[currentStep].title}</span>
          </CardTitle>
          <CardDescription>
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button
            onClick={handleFinish}
            className="rpa-gradient"
            disabled={!isStepValid(currentStep)}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Finalizar Configuração
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!isStepValid(currentStep)}
            className="rpa-gradient"
          >
            Próximo
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfigWizard;
