import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Play,
  Pause,
  Square,
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const fetchExecutions = async () => {
  const res = await fetch("http://localhost:8000/executions");
  if (!res.ok) throw new Error("Erro ao buscar execuções");
  return res.json();
};

const createExecution = async (execution) => {
  const res = await fetch("http://localhost:8000/executions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(execution),
  });
  if (!res.ok) throw new Error("Erro ao criar execução");
  return res.json();
};

const ExecutionMonitor = () => {
  const queryClient = useQueryClient();
  const {
    data: executions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["executions"],
    queryFn: fetchExecutions,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newExecution, setNewExecution] = useState({
    template_id: 1, // Exemplo fixo, pode ser dinâmico
    status: "pending",
    start_time: new Date().toISOString(),
  });

  const mutation = useMutation({
    mutationFn: createExecution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["executions"] });
      setNewExecution({
        template_id: 1,
        status: "pending",
        start_time: new Date().toISOString(),
      });
      setIsDialogOpen(false);
    },
  });

  const handleCreateExecution = () => {
    mutation.mutate(newExecution);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Carregando execuções...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar execuções.
      </div>
    );
  }

  // Separar execução atual e histórico (exemplo: status 'running' é atual)
  const currentExecution = executions?.find((e) => e.status === "running");
  const history = executions?.filter((e) => e.status !== "running") || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-500/20 text-green-500 border-green-500/30",
      running: "bg-blue-500/20 text-blue-500 border-blue-500/30",
      pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      failed: "bg-red-500/20 text-red-500 border-red-500/30",
    };

    const labels = {
      completed: "Concluído",
      running: "Executando",
      pending: "Pendente",
      failed: "Falhou",
    };

    return (
      <Badge
        variant="outline"
        className={variants[status as keyof typeof variants]}
      >
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Monitoramento de Execuções
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe o status e progresso das suas automações
          </p>
        </div>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setIsDialogOpen(true)}
        >
          Nova Execução
        </button>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Nova Execução</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="ID do template"
              type="number"
              value={newExecution.template_id}
              onChange={(e) =>
                setNewExecution({
                  ...newExecution,
                  template_id: Number(e.target.value),
                })
              }
            />
            <div className="flex space-x-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                onClick={handleCreateExecution}
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
              <div className="text-red-500 mt-2">Erro ao salvar execução.</div>
            )}
          </div>
        </div>
      )}
      {/* Current Execution */}
      {currentExecution ? (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <div className="status-indicator status-running"></div>
                  <span>Execução Atual</span>
                </CardTitle>
                <CardDescription>Execução em andamento</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  {/* Botões de controle futuramente */}
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {currentExecution.processed}
                </p>
                <p className="text-sm text-muted-foreground">Processados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {currentExecution.total}
                </p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500">
                  {currentExecution.errors}
                </p>
                <p className="text-sm text-muted-foreground">Erros</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">
                  {currentExecution.estimatedCompletion || "-"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Término Previsto
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{currentExecution.progress || 0}%</span>
              </div>
              <Progress
                value={currentExecution.progress || 0}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
          Nenhuma execução em andamento.
        </div>
      )}

      {/* Execution History */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Execuções</CardTitle>
              <CardDescription>Últimas automações executadas</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
                Nenhuma execução encontrada.
              </div>
            ) : (
              history.map((execution) => (
                <div
                  key={execution.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      Execução #{execution.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {execution.processed}/{execution.total} registros
                      {execution.errors > 0 && (
                        <span className="text-red-500 ml-2">
                          • {execution.errors} erros
                        </span>
                      )}
                    </p>
                  </div>
                  <Badge variant="outline">{execution.status}</Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutionMonitor;
