
import React from 'react';
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  FileText,
  Bot,
  Zap
} from 'lucide-react';

const MetricsDashboard = () => {
  const metrics = [
    {
      title: 'Automações Ativas',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Bot,
      color: 'text-blue-500'
    },
    {
      title: 'Execuções Hoje',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: Activity,
      color: 'text-green-500'
    },
    {
      title: 'Taxa de Sucesso',
      value: '98.2%',
      change: '+1.2%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'text-emerald-500'
    },
    {
      title: 'Tempo Economizado',
      value: '47h',
      change: '+12h',
      changeType: 'positive',
      icon: Clock,
      color: 'text-purple-500'
    },
    {
      title: 'Formulários Preenchidos',
      value: '2,341',
      change: '+189',
      changeType: 'positive',
      icon: FileText,
      color: 'text-orange-500'
    },
    {
      title: 'Velocidade Média',
      value: '2.3s',
      change: '-0.5s',
      changeType: 'positive',
      icon: Zap,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="metric-card group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {metric.title}
                </p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsDashboard;
