import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { api } from '../services/api';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('aspirante@sena.co');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.login(email);
      onLoginSuccess();
      navigate('/app/dashboard');
    } catch (error) {
      alert('Error en login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#00324D]">Bienvenido de nuevo</h1>
          <p className="text-slate-500">Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39A900] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              value="demo123"
              readOnly
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
            />
          </div>

          <Button fullWidth type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>

          <div className="text-center text-sm text-slate-500 mt-4">
             <p>Cuentas Demo:</p>
             <p>aspirante@sena.co</p>
             <p>admin@equipo.co</p>
          </div>
        </form>
      </Card>
    </div>
  );
};