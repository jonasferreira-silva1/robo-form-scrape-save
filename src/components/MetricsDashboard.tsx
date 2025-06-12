import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  Bot,
  Zap,
} from "lucide-react";

const fetchAutomations = async () => {
  const res = await fetch("http://localhost:8000/automations");
  if (!res.ok) throw new Error("Erro ao buscar automações");
  return res.json();
};

const MetricsDashboard = () => {
  const {
    data: automations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["automations"],
    queryFn: fetchAutomations,
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Carregando métricas...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar métricas.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="metric-card group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Automações Cadastradas
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-foreground">
                {automations ? automations.length : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
