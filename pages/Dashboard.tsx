import React, { useEffect, useState } from 'react';
import { Card, Button, ProgressBar, Badge } from '../components/ui';
import { api } from '../services/api';
import { QuizResult, User } from '../types';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, BookOpen, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getHistory();
        setHistory(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Calculate stats
  const lastScore = history.length > 0 ? history[history.length - 1].score : 0;
  const avgScore = history.length > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length) : 0;
  
  // Chart Data format
  const chartData = history.map((h, i) => ({
    name: `Test ${i + 1}`,
    score: h.score
  }));

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#39A900]"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#00324D]">Hola, Juan 👋</h2>
        <span className="text-sm text-slate-500">{new Date().toLocaleDateString()}</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-[#00324D] to-[#004e75] text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 text-sm">Probabilidad de Aprobación</p>
              <h3 className="text-3xl font-bold mt-1">{avgScore > 0 ? avgScore : 0}%</h3>
            </div>
            <TrendingUp className="text-[#82DEF0]" />
          </div>
          <p className="text-sm text-blue-200">Basado en tus últimos {history.length} intentos.</p>
        </Card>

        <Card className="border-l-4 border-l-[#39A900]">
          <h3 className="font-bold text-lg mb-2">Reto del Día</h3>
          <p className="text-slate-600 text-sm mb-4">Responde 5 preguntas de "Atención al Ciudadano" en menos de 2 minutos.</p>
          <Button size="sm" onClick={() => navigate('/app/simulate')}>Aceptar Reto</Button>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <h3 className="font-bold text-lg mb-4">Tu Rendimiento</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="score" stroke="#39A900" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Activity */}
      <div>
        <h3 className="font-bold text-lg text-[#00324D] mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {history.map((item) => (
            <Card key={item.id} className="p-4 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.type}</p>
                    <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
               </div>
               <div className="text-right">
                 <p className="font-bold text-lg">{item.score}/100</p>
                 <Badge color={item.passed ? 'green' : 'red'}>{item.passed ? 'Aprobado' : 'Mejorar'}</Badge>
               </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};