// src/components/layout/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {  useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  courses?: number;
  notifications: number;
}

interface HeaderProps {
  user: User;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuToggle }) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para detectar scroll y cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    // Lógica de cierre de sesión
    console.log('Cerrando sesión...');
    setIsProfileOpen(false);
  };

  const notifications = [
    { id: 1, title: 'Nueva tarea asignada', course: 'Matemáticas', time: 'Hace 10 min', read: false },
    { id: 2, title: 'Calificación publicada', course: 'Historia', time: 'Hace 2 horas', read: false },
    { id: 3, title: 'Clase cancelada', course: 'Física', time: 'Ayer', read: true },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 min-lg:pl-56 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-gradient-to-r from-blue-600 to-indigo-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y menú móvil */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="text-white p-2 rounded-md lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link href="/dashboard" className="flex items-center space-x-2 ml-2 lg:ml-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isScrolled ? 'bg-blue-600' : 'bg-white'
              }`}>
                <span className={`font-bold ${isScrolled ? 'text-white' : 'text-blue-600'}`}>I</span>
              </div>
              <span className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'} max-sm:hidden`}>
                Institución X
              </span>
            </Link>
          </div>

          {/* Barra de búsqueda (escritorio) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar cursos, materiales..." 
                  className={`block w-full pl-10 pr-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isScrolled ? 'bg-gray-100 border-gray-200' : 'bg-white bg-opacity-20 border-white border-opacity-30 text-black placeholder-gray-400'
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-3">
            {/* Botón de búsqueda móvil */}
            <button className="md:hidden text-white p-1">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notificaciones */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-1 rounded-full relative ${
                  isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {user.notifications > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-xs text-white items-center justify-center">
                      {user.notifications}
                    </span>
                  </span>
                )}
              </button>

              {/* Dropdown de notificaciones */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Notificaciones</h3>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Marcar todas como leídas
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.course}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 text-center">
                    <Link href="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                      Ver todas las notificaciones
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Perfil de usuario */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className={`h-8 w-8 rounded-full border-2 ${
                  isScrolled ? 'border-gray-300' : 'border-white'
                } overflow-hidden`}>
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <div className={`h-full w-full flex items-center justify-center ${
                      isScrolled ? 'bg-blue-600' : 'bg-white'
                    }`}>
                      <span className={`text-sm font-medium ${
                        isScrolled ? 'text-white' : 'text-blue-600'
                      }`}>
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <span className={`hidden md:block text-sm font-medium ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  {user.name}
                </span>
                <svg
                  className={`h-4 w-4 ${isScrolled ? 'text-gray-600' : 'text-white'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown de perfil */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-900 font-medium">{user.name}</p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Mi perfil
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Configuración
                  </Link>
                  <Link
                    href="/help"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Centro de ayuda
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progreso de cursos (solo cuando hay scroll) */}
      {isScrolled && user.courses !== undefined && (
        <div className="bg-blue-50 px-4 py-1 border-t border-gray-200 pl-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {user.courses} curso{user.courses !== 1 ? 's' : ''} en progreso
              </span>
              <div className="w-48 bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${Math.min((user.courses / 5) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-blue-600 font-medium">
                {Math.round(Math.min((user.courses / 5) * 100, 100))}%
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;