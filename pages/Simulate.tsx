import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, ProgressBar, Badge } from '../components/ui';
import { api } from '../services/api';
import { Question, QuizResult } from '../types';
import { Timer, AlertCircle, CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';

type SimulationState = 'LOBBY' | 'ACTIVE' | 'RESULTS';

export const Simulate: React.FC = () => {
  const [viewState, setViewState] = useState<SimulationState>('LOBBY');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]); // Array of selected indices
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [result, setResult] = useState<QuizResult | null>(null);
  const navigate = useNavigate();

  // --- Logic for Active Exam ---
  useEffect(() => {
    let timer: any;
    if (viewState === 'ACTIVE' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && viewState === 'ACTIVE') {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [viewState, timeLeft]);

  const startExam = async () => {
    const q = await api.getQuestions(5); // Get 5 random questions
    setQuestions(q);
    setAnswers(new Array(q.length).fill(-1));
    setCurrentIndex(0);
    setTimeLeft(600);
    setViewState('ACTIVE');
    // We are technically navigating to a "fullscreen" mode
    navigate('/app/simulate/active'); 
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const finishExam = async () => {
    // Calculate Score
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correctCount++;
    });
    const score = Math.round((correctCount / questions.length) * 100);

    const resultData: QuizResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      passed: score >= 70,
      type: 'Simulacro'
    };

    await api.saveResult(resultData);
    setResult(resultData);
    setViewState('RESULTS');
    navigate('/app/simulate'); // Return to standard URL
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- VIEW: LOBBY ---
  if (viewState === 'LOBBY') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#00324D]">Centro de Simulación</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:border-[#39A900] cursor-pointer transition-colors border-2 border-transparent">
            <Badge color="blue">Recomendado</Badge>
            <h3 className="text-xl font-bold mt-2">Prueba Rápida</h3>
            <p className="text-slate-500 text-sm mb-4">5 preguntas • 10 minutos</p>
            <p className="text-sm mb-4">Ideal para repasar conceptos clave en poco tiempo.</p>
            <Button fullWidth onClick={startExam}>Iniciar Ahora</Button>
          </Card>
          
          <Card className="opacity-60">
            <Badge color="yellow">Premium</Badge>
            <h3 className="text-xl font-bold mt-2">Simulacro Completo</h3>
            <p className="text-slate-500 text-sm mb-4">50 preguntas • 60 minutos</p>
            <p className="text-sm mb-4">Experiencia idéntica al examen real del SENA.</p>
            <Button variant="outline" fullWidth disabled>Bloqueado</Button>
          </Card>
        </div>
      </div>
    );
  }

  // --- VIEW: ACTIVE EXAM (Focus Mode) ---
  if (viewState === 'ACTIVE') {
    const currentQ = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
      <div className="fixed inset-0 bg-[#F8FAFC] z-50 flex flex-col">
        {/* Sticky Header */}
        <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0">
          <div className="text-sm font-medium text-slate-500">
            Pregunta {currentIndex + 1} de {questions.length}
          </div>
          <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-500' : 'text-[#00324D]'}`}>
            <Timer size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-200 w-full">
           <div className="h-full bg-[#39A900] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full">
          <Card className="mb-6">
            <p className="text-lg md:text-xl font-medium text-[#1E293B] leading-relaxed">
              {currentQ.text}
            </p>
          </Card>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <label 
                key={idx} 
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[currentIndex] === idx 
                    ? 'border-[#39A900] bg-green-50' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input 
                  type="radio" 
                  name="option" 
                  className="w-5 h-5 text-[#39A900] focus:ring-[#39A900]" 
                  checked={answers[currentIndex] === idx}
                  onChange={() => handleAnswer(idx)}
                />
                <span className="ml-3 text-slate-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center max-w-full">
          <Button 
            variant="outline" 
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            Anterior
          </Button>
          
          {currentIndex === questions.length - 1 ? (
             <Button variant="primary" onClick={finishExam} className="bg-[#00324D]">
               Finalizar Prueba
             </Button>
          ) : (
            <Button 
              variant="secondary" 
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            >
              Siguiente <ArrowRight size={18} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // --- VIEW: RESULTS ---
  if (viewState === 'RESULTS' && result) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card className={`text-center py-10 border-t-8 ${result.passed ? 'border-t-green-500' : 'border-t-red-500'}`}>
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${result.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
             {result.passed ? <CheckCircle size={40} /> : <XCircle size={40} />}
          </div>
          <h2 className="text-3xl font-bold text-[#00324D] mb-2">{result.score}/100</h2>
          <p className="text-lg font-medium text-slate-600 mb-6">
            {result.passed ? '¡Excelente trabajo!' : 'Necesitas reforzar algunos temas.'}
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setViewState('LOBBY')}>Volver al inicio</Button>
            <Button variant="outline" onClick={() => navigate('/app/learn')}>Ir a Estudiar</Button>
          </div>
        </Card>

        <h3 className="font-bold text-xl mt-8 mb-4">Revisión de Respuestas</h3>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <Card key={q.id} className="p-4">
                 <div className="flex gap-3">
                    <div className={`mt-1 flex-shrink-0 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                       {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    </div>
                    <div className="flex-1">
                       <p className="font-medium mb-2">{q.text}</p>
                       <p className="text-sm text-slate-500 mb-1">Tu respuesta: <span className={isCorrect ? 'text-green-600' : 'text-red-600 font-medium'}>{q.options[userAnswer]}</span></p>
                       {!isCorrect && (
                         <p className="text-sm text-green-700 mb-2">Respuesta Correcta: <strong>{q.options[q.correctAnswer]}</strong></p>
                       )}
                       <div className="bg-blue-50 p-3 rounded-lg mt-2 text-sm text-blue-800">
                         <strong>Por qué:</strong> {q.explanation}
                       </div>
                    </div>
                 </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};