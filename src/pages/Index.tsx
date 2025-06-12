import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Settings,
  Activity,
  FileText,
  Bot,
  Zap,
  FolderOpen,
  Calendar,
  Wand2,
} from "lucide-react";
import Header from "@/components/Header";
import MetricsDashboard from "@/components/MetricsDashboard";
import ProjectConfig from "@/components/ProjectConfig";
import ExecutionMonitor from "@/components/ExecutionMonitor";
import TemplateManager from "@/components/TemplateManager";
import ScheduleManager from "@/components/ScheduleManager";
import ReportsManager from "@/components/ReportsManager";
import ConfigWizard from "@/components/ConfigWizard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rpa-gradient rounded-xl flex items-center justify-center rpa-glow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">RPA Studio</h1>
              <p className="text-muted-foreground">
                Plataforma de Automação Robótica de Processos
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-background/50 backdrop-blur-sm">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="wizard" className="flex items-center space-x-2">
              <Wand2 className="w-4 h-4" />
              <span>Assistente</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Configuração</span>
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="flex items-center space-x-2"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Templates</span>
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendamento</span>
            </TabsTrigger>
            <TabsTrigger
              value="monitor"
              className="flex items-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>Monitor</span>
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Relatórios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-slide-up">
            <div className="space-y-8">
              <MetricsDashboard />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="metric-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span>Automações Recentes</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 text-center text-muted-foreground rounded-lg bg-background/30">
                      Nenhuma automação recente encontrada.
                    </div>
                  </div>
                </div>

                <div className="metric-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span>Performance do Sistema</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU</span>
                        <span>23%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "23%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memória</span>
                        <span>67%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "67%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Rede</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "12%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wizard" className="animate-slide-up">
            <ConfigWizard />
          </TabsContent>

          <TabsContent value="config" className="animate-slide-up">
            <ProjectConfig />
          </TabsContent>

          <TabsContent value="templates" className="animate-slide-up">
            <TemplateManager />
          </TabsContent>

          <TabsContent value="schedule" className="animate-slide-up">
            <ScheduleManager />
          </TabsContent>

          <TabsContent value="monitor" className="animate-slide-up">
            <ExecutionMonitor />
          </TabsContent>

          <TabsContent value="reports" className="animate-slide-up">
            <ReportsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
