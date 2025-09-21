// src/components/layout/LayoutWrapper.tsx
'use client';

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TeacherSidebar from './TeacherSidebar';
import AdminSidebar from './AdminSidebar';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  courses?: number;
  notifications: number;
  students?: number; // Para profesores
  users?: number; // Para administradores
}

interface LayoutWrapperProps {
  children: React.ReactNode;
  user: User;
}

export default function LayoutWrapper({ children, user }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Renderizar el sidebar adecuado según el rol
  const renderSidebar = () => {
    switch (user.role) {
      case 'teacher':
        return (
          <TeacherSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            user={user}
          />
        );
      case 'admin':
        return (
          <AdminSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            user={user}
          />
        );
      default:
        return (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            user={user}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      {renderSidebar()}
      <main className="pt-16 lg:pt-20 lg:pl-64">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}