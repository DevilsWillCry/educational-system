// src/components/layout/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  users?: number;
  courses?: number;
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '🏠' },
  { name: 'Usuarios', href: '/admin/users', icon: '👥' },
  { name: 'Cursos', href: '/admin/courses', icon: '📚' },
  { name: 'Categorías', href: '/admin/categories', icon: '🏷️' },
  { name: 'Reportes', href: '/admin/reports', icon: '📊' },
  { name: 'Facturación', href: '/admin/billing', icon: '💳' },
  { name: 'Configuración', href: '/admin/settings', icon: '⚙️' },
  { name: 'Sistema', href: '/admin/system', icon: '🔧' },
  { name: 'Logs', href: '/admin/logs', icon: '📋' },
];

const adminTools = [
  { name: 'Backups', href: '/admin/backups', icon: '💾' },
  { name: 'Mantenimiento', href: '/admin/maintenance', icon: '🛠️' },
  { name: 'API', href: '/admin/api', icon: '🔌' },
  { name: 'Notificaciones', href: '/admin/notifications', icon: '🔔' },
];

export default function AdminSidebar({ isOpen, onClose, user }: AdminSidebarProps) {
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
        fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <span className="font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold">EduPlus 📚</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Información del administrador */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-lg font-medium text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  Administrador
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="bg-blue-900 bg-opacity-50 p-2 rounded text-center">
                <p className="text-xs text-blue-300 font-medium">Usuarios</p>
                <p className="text-sm font-bold">{user.users || 0}</p>
              </div>
              <div className="bg-green-900 bg-opacity-50 p-2 rounded text-center">
                <p className="text-xs text-green-300 font-medium">Cursos</p>
                <p className="text-sm font-bold">{user.courses || 0}</p>
              </div>
            </div>
          </div>

          {/* Menú de navegación principal */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Administración
              </h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-blue-700 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                      onClick={onClose}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Herramientas de administración */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Herramientas
              </h3>
              <ul className="space-y-2">
                {adminTools.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-blue-700 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                      onClick={onClose}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Estado del sistema */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Estado del sistema</span>
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <div className="text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Uptime</span>
                <span className="text-green-400">99.98%</span>
              </div>
              <div className="flex justify-between">
                <span>Usuarios online</span>
                <span>247</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}