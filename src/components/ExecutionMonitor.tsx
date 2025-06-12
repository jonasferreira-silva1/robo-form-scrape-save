
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ExecutionMonitor = () => {
  const [currentExecution, setCurrentExecution] = useState({
    status: 'running',
    progress: 67,
    processed: 134,
    total: 200,
    errors: 2,
    startTime: '14:30',
    estimatedCompletion: '15:45'
  });

  const [executions] = useState([
    {
      id: '001',
      name: 'Formulário Clientes - Lote 1',
      status: 'completed',
      processed: 200,
      total: 200,
      errors: 0,
      duration: '12m 34s',
      completedAt: '13:45'
    },
    {
      id: '002',
      name: 'Cadastro Fornecedores',
      status: 'running',
      processed: 134,
      total: 200,
      errors: 2,
      duration: '8m 12s',
      completedAt: '-'
    },
    {
      id: '003',
      name: 'Atualização Produtos',
      status: 'pending',
      processed: 0,
      total: 150,
      errors: 0,
      duration: '-',
      completedAt: '-'
    },
    {
      id: '004',
      name: 'Relatório Vendas',
      status: 'failed',
      processed: 45,
      total: 100,
      errors: 12,
      duration: '5m 23s',
      completedAt: '12:30'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'running':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-500/20 text-green-500 border-green-500/30',
      running: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-500 border-red-500/30'
    };

    const labels = {
      completed: 'Concluído',
      running: 'Executando',
      pending: 'Pendente',
      failed: 'Falhou'
    };

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Current Execution */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <div className="status-indicator status-running"></div>
                <span>Execução Atual</span>
              </CardTitle>
              <CardDescription>
                Formulário Clientes - Lote 2
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Pause className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Square className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{currentExecution.processed}</p>
              <p className="text-sm text-muted-foreground">Processados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{currentExecution.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{currentExecution.errors}</p>
              <p className="text-sm text-muted-foreground">Erros</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">{currentExecution.estimatedCompletion}</p>
              <p className="text-sm text-muted-foreground">Término Previsto</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{currentExecution.progress}%</span>
            </div>
            <Progress value={currentExecution.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Execution History */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Execuções</CardTitle>
              <CardDescription>
                Últimas automações executadas
              </CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executions.map((execution) => (
              <div 
                key={execution.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(execution.status)}
                  <div>
                    <p className="font-medium text-foreground">{execution.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {execution.processed}/{execution.total} registros
                      {execution.errors > 0 && (
                        <span className="text-red-500 ml-2">• {execution.errors} erros</span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{execution.duration}</p>
                    <p className="text-xs text-muted-foreground">
                      {execution.completedAt !== '-' ? `Concluído às ${execution.completedAt}` : 'Em andamento'}
                    </p>
                  </div>
                  {getStatusBadge(execution.status)}
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutionMonitor;
