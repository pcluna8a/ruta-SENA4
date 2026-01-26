import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, BookOpen, Activity, User, Menu, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userProgress?: number;
  userAvatar?: string;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, userProgress = 0, userAvatar, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Don't show layout on landing or login or active simulation
  if (['/', '/login'].includes(location.pathname) || location.pathname.includes('/simulate/active')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 md:pb-0 md:pl-64">
      {/* Top Bar Mobile */}
      <header className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 w-full">
           <img src="https://picsum.photos/40/40" alt="Avatar" className="w-8 h-8 rounded-full bg-slate-200" />
           <div className="flex-1">
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-[#39A900]" style={{ width: `${userProgress}%` }} />
             </div>
             <p className="text-[10px] text-slate-500 mt-1">Nivel: Aspirante Técnico</p>
           </div>
        </div>
      </header>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-white border-r border-slate-200 z-40">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#00324D]">Ruta al SENA</h1>
        </div>
        
        <div className="px-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img src={userAvatar || "https://picsum.photos/40/40"} alt="Avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium text-sm text-[#1E293B]">Juan Pérez</p>
              <p className="text-xs text-slate-500">Aspirante</p>
            </div>
          </div>
          <div className="text-xs text-slate-500 mb-1">Progreso General</div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-[#39A900]" style={{ width: `${userProgress}%` }} />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem to="/app/dashboard" icon={<Home size={20} />} label="Inicio" active={isActive('/app/dashboard')} />
          <SidebarItem to="/app/learn" icon={<BookOpen size={20} />} label="Aprender" active={isActive('/app/learn')} />
          <SidebarItem to="/app/simulate" icon={<Activity size={20} />} label="Practicar" active={isActive('/app/simulate')} />
          <SidebarItem to="/app/profile" icon={<User size={20} />} label="Perfil" active={isActive('/app/profile')} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors w-full px-4 py-2">
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-4 md:p-8 max-w-5xl mx-auto">
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-2 z-50 pb-safe">
        <NavItem to="/app/dashboard" icon={<Home size={24} />} label="Inicio" active={isActive('/app/dashboard')} />
        <NavItem to="/app/learn" icon={<BookOpen size={24} />} label="Aprender" active={isActive('/app/learn')} />
        <NavItem to="/app/simulate" icon={<Activity size={24} />} label="Practicar" active={isActive('/app/simulate')} />
        <NavItem to="/app/profile" icon={<User size={24} />} label="Perfil" active={isActive('/app/profile')} />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active: boolean }> = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex flex-col items-center gap-1 p-2 ${active ? 'text-[#39A900]' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </Link>
);

const SidebarItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active: boolean }> = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-[#39A900]/10 text-[#39A900]' : 'text-slate-600 hover:bg-slate-50'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);