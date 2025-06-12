import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchReports = async () => {
  const res = await fetch("http://localhost:8000/reports");
  if (!res.ok) throw new Error("Erro ao buscar relatórios");
  return res.json();
};

const createReport = async (report) => {
  const res = await fetch("http://localhost:8000/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });
  if (!res.ok) throw new Error("Erro ao criar relatório");
  return res.json();
};

const ReportsManager = () => {
  const queryClient = useQueryClient();
  const {
    data: reports,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedProject, setSelectedProject] = useState("all");
  const [executionHistory, setExecutionHistory] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    execution_id: 1, // Exemplo fixo, pode ser dinâmico
    summary: "",
  });

  const mutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setNewReport({ execution_id: 1, summary: "" });
      setIsDialogOpen(false);
    },
  });

  const handleExportReport = (format: string) => {
    console.log(`Exportando relatório em formato: ${format}`);
    // Aqui seria implementada a lógica de exportação
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      case "running":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "failed":
        return "Falhou";
      case "running":
        return "Executando";
      default:
        return "Desconhecido";
    }
  };

  const handleCreateReport = () => {
    mutation.mutate(newReport);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Carregando relatórios...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar relatórios.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Relatórios e Analytics
          </h2>
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
      {!summaryStats ? (
        <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
          Nenhuma estatística disponível.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Total de Execuções
                </CardDescription>
                <CardTitle className="text-2xl text-blue-500">
                  {summaryStats.totalExecutions}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Taxa de Sucesso
                </CardDescription>
                <CardTitle className="text-2xl text-green-500">
                  {summaryStats.successRate}%
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Registros Processados
                </CardDescription>
                <CardTitle className="text-2xl text-purple-500">
                  {summaryStats.totalRecords}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Duração Média
                </CardDescription>
                <CardTitle className="text-2xl text-orange-500">
                  {summaryStats.avgDuration}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">
                  Tempo Economizado
                </CardDescription>
                <CardTitle className="text-2xl text-emerald-500">
                  {summaryStats.timeSaved}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </>
      )}

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
            <Button variant="outline" onClick={() => handleExportReport("pdf")}>
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportReport("excel")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" onClick={() => handleExportReport("csv")}>
              <PieChart className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportReport("json")}
            >
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
              <Select
                value={selectedProject}
                onValueChange={setSelectedProject}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Projetos</SelectItem>
                  <SelectItem value="clientes">Formulário Clientes</SelectItem>
                  <SelectItem value="fornecedores">
                    Cadastro Fornecedores
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {executionHistory.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
              Nenhum histórico de execução encontrado.
            </div>
          ) : (
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
                    <TableCell className="font-medium">
                      {execution.project}
                    </TableCell>
                    <TableCell>{execution.date}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${getStatusColor(
                          execution.status
                        )}`}
                      >
                        {getStatusText(execution.status)}
                      </span>
                    </TableCell>
                    <TableCell>{execution.records}</TableCell>
                    <TableCell>{execution.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Reports Table */}
      {!reports || reports.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
          Nenhum relatório encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 border rounded-lg bg-background/30"
            >
              <h3 className="font-bold text-lg text-foreground">
                Relatório #{report.id}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Execução: {report.execution_id}
              </p>
              <p className="text-xs text-muted-foreground">
                Resumo: {report.summary}
              </p>
            </div>
          ))}
        </div>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Novo Relatório</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="ID da execução"
              type="number"
              value={newReport.execution_id}
              onChange={(e) =>
                setNewReport({
                  ...newReport,
                  execution_id: Number(e.target.value),
                })
              }
            />
            <textarea
              className="w-full mb-2 p-2 border rounded"
              placeholder="Resumo do relatório"
              value={newReport.summary}
              onChange={(e) =>
                setNewReport({ ...newReport, summary: e.target.value })
              }
            />
            <div className="flex space-x-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                onClick={handleCreateReport}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Salvando..." : "Salvar"}
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={() => setIsDialogOpen(false)}
                disabled={mutation.isPending}
              >
                Cancelar
              </button>
            </div>
            {mutation.isError && (
              <div className="text-red-500 mt-2">Erro ao salvar relatório.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsManager;
