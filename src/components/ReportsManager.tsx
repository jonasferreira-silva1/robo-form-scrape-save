
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReportsManager = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedProject, setSelectedProject] = useState('all');

  const executionHistory = [
    { id: '1', project: 'Formulário Clientes', date: '2024-06-12 14:30', status: 'completed', records: 45, duration: '2m 15s' },
    { id: '2', project: 'Cadastro Fornecedores', date: '2024-06-12 09:15', status: 'completed', records: 23, duration: '1m 42s' },
    { id: '3', project: 'Formulário Clientes', date: '2024-06-11 16:45', status: 'failed', records: 0, duration: '0m 30s' },
    { id: '4', project: 'Relatório Vendas', date: '2024-06-11 11:20', status: 'completed', records: 67, duration: '3m 08s' },
    { id: '5', project: 'Cadastro Fornecedores', date: '2024-06-10 08:30', status: 'completed', records: 34, duration: '2m 01s' }
  ];

  const summaryStats = {
    totalExecutions: 156,
    successRate: 94.2,
    totalRecords: 2341,
    avgDuration: '2m 15s',
    timeSaved: '47h 23m'
  };

  const handleExportReport = (format: string) => {
    console.log(`Exportando relatório em formato: ${format}`);
    // Aqui seria implementada a lógica de exportação
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'running': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'failed': return 'Falhou';
      case 'running': return 'Executando';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Relatórios e Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Análise detalhada do desempenho das suas automações
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total de Execuções</CardDescription>
            <CardTitle className="text-2xl text-blue-500">{summaryStats.totalExecutions}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Taxa de Sucesso</CardDescription>
            <CardTitle className="text-2xl text-green-500">{summaryStats.successRate}%</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Registros Processados</CardDescription>
            <CardTitle className="text-2xl text-purple-500">{summaryStats.totalRecords}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Duração Média</CardDescription>
            <CardTitle className="text-2xl text-orange-500">{summaryStats.avgDuration}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Tempo Economizado</CardDescription>
            <CardTitle className="text-2xl text-emerald-500">{summaryStats.timeSaved}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Export Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-blue-500" />
            <span>Exportar Relatórios</span>
          </CardTitle>
          <CardDescription>
            Exporte dados em diferentes formatos para análise externa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleExportReport('pdf')}>
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('excel')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('csv')}>
              <PieChart className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" onClick={() => handleExportReport('json')}>
              <TrendingUp className="w-4 h-4 mr-2" />
              JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Execution History Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span>Histórico de Execuções</span>
              </CardTitle>
              <CardDescription>
                Registro detalhado de todas as execuções realizadas
              </CardDescription>
            </div>
            
            <div className="flex space-x-2">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Projetos</SelectItem>
                  <SelectItem value="clientes">Formulário Clientes</SelectItem>
                  <SelectItem value="fornecedores">Cadastro Fornecedores</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registros</TableHead>
                <TableHead>Duração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {executionHistory.map((execution) => (
                <TableRow key={execution.id}>
                  <TableCell className="font-medium">{execution.project}</TableCell>
                  <TableCell>{execution.date}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getStatusColor(execution.status)}`}>
                      {getStatusText(execution.status)}
                    </span>
                  </TableCell>
                  <TableCell>{execution.records}</TableCell>
                  <TableCell>{execution.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsManager;
