import React, { useEffect, useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { api } from '../services/api';
import { LearningModule } from '../types';
import { Lock, CheckCircle, PlayCircle, X } from 'lucide-react';

export const Learn: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  useEffect(() => {
    api.getModules().then(setModules);
  }, []);

  return (
    <div className="space-y-6">
       <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#00324D]">Módulos de Aprendizaje</h2>
        <p className="text-slate-500">Domina los temas clave antes del examen.</p>
      </div>

      <div className="grid gap-4">
        {modules.map((mod) => (
          <Card key={mod.id} className={`${mod.isLocked ? 'opacity-75 bg-slate-50' : ''}`}>
             <div className="flex justify-between items-start">
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                   <Badge color="blue">{mod.category}</Badge>
                   <span className="text-xs text-slate-500 flex items-center gap-1">
                     <PlayCircle size={12} /> {mod.duration}
                   </span>
                 </div>
                 <h3 className="font-bold text-lg text-[#00324D] mb-1">{mod.title}</h3>
                 <p className="text-sm text-slate-600 mb-4">{mod.description}</p>
                 
                 {mod.isLocked ? (
                   <Button variant="outline" size="sm" disabled className="gap-2">
                     <Lock size={16} /> Bloqueado
                   </Button>
                 ) : (
                   <Button onClick={() => setSelectedModule(mod)} size="sm" variant={mod.isCompleted ? 'outline' : 'primary'}>
                     {mod.isCompleted ? 'Repasar' : 'Comenzar Lección'}
                   </Button>
                 )}
               </div>
               {mod.isCompleted && <CheckCircle className="text-green-500" />}
             </div>
          </Card>
        ))}
      </div>

      {/* Module Reader Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white rounded-t-xl">
              <h3 className="font-bold text-xl">{selectedModule.title}</h3>
              <button onClick={() => setSelectedModule(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto prose prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedModule.content }} />
            </div>

            <div className="p-4 border-t bg-slate-50 rounded-b-xl flex justify-end">
              <Button onClick={() => setSelectedModule(null)}>Marcar como completado</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};