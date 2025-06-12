import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Play,
  Pause,
  Settings,
  Plus,
  Trash2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Schedule {
  id: string;
  name: string;
  projectName: string;
  frequency: string;
  time: string;
  isActive: boolean;
  nextRun: string;
  lastRun?: string;
  status: "active" | "paused" | "error";
}

const fetchSchedules = async () => {
  const res = await fetch("http://localhost:8000/schedules");
  if (!res.ok) throw new Error("Erro ao buscar agendamentos");
  return res.json();
};

const createSchedule = async (schedule) => {
  const res = await fetch("http://localhost:8000/schedules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schedule),
  });
  if (!res.ok) throw new Error("Erro ao criar agendamento");
  return res.json();
};

const ScheduleManager = () => {
  const queryClient = useQueryClient();
  const {
    data: schedules,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: fetchSchedules,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    projectName: "",
    frequency: "",
    time: "",
    is_active: true,
  });

  const mutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      setNewSchedule({
        name: "",
        projectName: "",
        frequency: "",
        time: "",
        is_active: true,
      });
      setIsDialogOpen(false);
    },
  });

  const handleCreateSchedule = () => {
    mutation.mutate(newSchedule);
  };

  const toggleSchedule = (id: string) => {
    // Logic to toggle schedule
  };

  const deleteSchedule = (id: string) => {
    // Logic to delete schedule
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Carregando agendamentos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar agendamentos.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Agendamentos
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure execuções automáticas para suas automações
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rpa-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Agendamento</DialogTitle>
              <DialogDescription>
                Configure uma execução automática para sua automação
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-name">Nome do Agendamento</Label>
                <Input
                  id="schedule-name"
                  placeholder="Ex: Execução Diária"
                  value={newSchedule.name}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-select">Projeto</Label>
                <Select
                  value={newSchedule.projectName}
                  onValueChange={(value) =>
                    setNewSchedule({ ...newSchedule, projectName: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente-form">
                      Formulário Clientes
                    </SelectItem>
                    <SelectItem value="fornecedor-form">
                      Cadastro Fornecedores
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select
                    value={newSchedule.frequency}
                    onValueChange={(value) =>
                      setNewSchedule({ ...newSchedule, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Frequência" />
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
                    value={newSchedule.time}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleCreateSchedule}
                  className="flex-1"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Salvando..." : "Salvar"}
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
          </DialogContent>
        </Dialog>
      </div>

      {!schedules || schedules.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
          Nenhum agendamento cadastrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {schedules.map((schedule) => (
            <Card
              key={schedule.id}
              className="bg-card/50 backdrop-blur-sm border-border/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{schedule.name}</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {schedule.projectName}
                    </CardDescription>
                  </div>

                  <div
                    className={`status-indicator status-${schedule.status}`}
                  ></div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Frequência:</span>
                    <p className="font-medium">
                      {schedule.frequency === "daily"
                        ? "Diário"
                        : schedule.frequency === "weekly"
                        ? "Semanal"
                        : "Mensal"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horário:</span>
                    <p className="font-medium">{schedule.time}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Próxima execução:
                    </span>
                    <p className="font-medium">{schedule.nextRun}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Última execução:
                    </span>
                    <p className="font-medium">{schedule.lastRun || "Nunca"}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={schedule.isActive ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleSchedule(schedule.id)}
                    className="flex-1"
                  >
                    {schedule.isActive ? (
                      <Pause className="w-3 h-3 mr-2" />
                    ) : (
                      <Play className="w-3 h-3 mr-2" />
                    )}
                    {schedule.isActive ? "Pausar" : "Ativar"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSchedule(schedule.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;
