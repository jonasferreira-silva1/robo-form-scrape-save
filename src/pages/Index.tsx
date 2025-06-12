
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Settings, 
  Activity,
  FileText,
  Bot,
  Zap
} from 'lucide-react';
import Header from '@/components/Header';
import MetricsDashboard from '@/components/MetricsDashboard';
import ProjectConfig from '@/components/ProjectConfig';
import ExecutionMonitor from '@/components/ExecutionMonitor';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Configuração</span>
            </TabsTrigger>
            <TabsTrigger value="monitor" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Monitoramento</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
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
                    {[
                      { name: 'Formulário Clientes', status: 'completed', time: '2 min atrás' },
                      { name: 'Cadastro Fornecedores', status: 'running', time: 'Agora' },
                      { name: 'Relatório Vendas', status: 'pending', time: 'Em fila' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                        <div className="flex items-center space-x-3">
                          <div className={`status-indicator status-${item.status}`}></div>
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                    ))}
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
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memória</span>
                        <span>67%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Rede</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="animate-slide-up">
            <ProjectConfig />
          </TabsContent>

          <TabsContent value="monitor" className="animate-slide-up">
            <ExecutionMonitor />
          </TabsContent>

          <TabsContent value="reports" className="animate-slide-up">
            <div className="metric-card text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Relatórios</h3>
              <p className="text-muted-foreground">
                Módulo de relatórios em desenvolvimento. Em breve você poderá visualizar relatórios detalhados das suas automações.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
