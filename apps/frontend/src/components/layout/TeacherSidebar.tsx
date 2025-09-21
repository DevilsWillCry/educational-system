// src/components/layout/TeacherSidebar.tsx
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
  students?: number;
}

interface TeacherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const navigation = [
  { name: 'Dashboard', href: '/teacher/dashboard', icon: '🏠' },
  { name: 'Mis Cursos', href: '/teacher/courses', icon: '📚' },
  { name: 'Tareas', href: '/teacher/assignments', icon: '📝' },
  { name: 'Calificaciones', href: '/teacher/grades', icon: '📊' },
  { name: 'Estudiantes', href: '/teacher/students', icon: '👥' },
  { name: 'Anuncios', href: '/teacher/announcements', icon: '📢' },
  { name: 'Calendario', href: '/teacher/calendar', icon: '📅' },
  { name: 'Recursos', href: '/teacher/resources', icon: '📁' },
  { name: 'Estadísticas', href: '/teacher/analytics', icon: '📈' },
];

export default function TeacherSidebar({ isOpen, onClose, user }: TeacherSidebarProps) {
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

          {/* Información del profesor */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-lg font-medium text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Profesor
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-2 rounded text-center">
                <p className="text-xs text-blue-600 font-medium">Cursos</p>
                <p className="text-sm font-bold">{user.courses || 0}</p>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <p className="text-xs text-green-600 font-medium">Estudiantes</p>
                <p className="text-sm font-bold">{user.students || 0}</p>
              </div>
            </div>
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

          {/* Acciones rápidas */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Acciones rápidas
            </h3>
            <div className="space-y-2">
              <Link
                href="/teacher/assignments/new"
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                onClick={onClose}
              >
                <span className="mr-2">+</span>
                Nueva tarea
              </Link>
              <Link
                href="/teacher/announcements/new"
                className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <span className="mr-2">+</span>
                Nuevo anuncio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}