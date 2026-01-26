import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { CheckCircle, BookOpen, Clock, Award } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 md:px-8 border-b border-slate-100">
        <div className="font-bold text-xl text-[#00324D]">Ruta al SENA</div>
        <div className="space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Ingresar</Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Registrarse</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 py-16 md:py-24 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#00324D] tracking-tight mb-6">
          Tu lugar en el SENA está a <span className="text-[#39A900]">un examen</span> de distancia
        </h1>
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Prepárate con simulacros reales y material teórico enfocado en la convocatoria 2026. Aumenta tus probabilidades de pasar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="accent" size="lg" onClick={() => navigate('/login')}>
            Empezar prueba gratuita
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Aprende</h3>
              <p className="text-slate-500">Contenido enfocado en competencias básicas y comportamentales.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Simula</h3>
              <p className="text-slate-500">Pruebas con tiempo real y preguntas tipo selección múltiple.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Aprueba</h3>
              <p className="text-slate-500">Obtén retroalimentación inmediata y mejora tus puntos débiles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00324D] text-white py-8 text-center">
        <p className="opacity-70">© 2024 Ruta al SENA. Proyecto Independiente.</p>
      </footer>
    </div>
  );
};