// src/components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  courses?: number;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Mis Cursos', href: '/courses', icon: '📚' },
  { name: 'Calificaciones', href: '/grades', icon: '📊' },
  { name: 'Tareas', href: '/assignments', icon: '📝' },
  { name: 'Calendario', href: '/calendar', icon: '📅' },
  { name: 'Mensajes', href: '/messages', icon: '✉️' },
  { name: 'Recursos', href: '/resources', icon: '📁' },
  { name: 'Foro', href: '/forum', icon: '💬' },
];

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold text-gray-800">EduPlus 📚</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Perfil de usuario */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            {user.courses !== undefined && (
              <div className="mt-3 bg-blue-50 p-2 rounded text-center">
                <p className="text-xs text-blue-600 font-medium">Cursos inscritos</p>
                <p className="text-sm font-bold">{user.courses}</p>
              </div>
            )}
          </div>

          {/* Menú de navegación */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={onClose}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Progreso general */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">Progreso general</span>
              <span className="text-xs font-medium text-blue-600">68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: '68%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}