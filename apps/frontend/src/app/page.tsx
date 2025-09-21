// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import CourseCard from "@/components/dashboard/CourseCard";
import UpcomingClasses from "@/components/dashboard/UpcomingClasses";
import ProgressChart from "@/components/dashboard/ProgressChart";
import RecentActivities from "@/components/dashboard/RecentActivities";

interface Activity {
  id: string;
  type: 'assignment' | 'quiz' | 'lesson' | 'announcement';
  title: string;
  course: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'late';
  score?: number;
}

// Datos de ejemplo
const userData = {
  id: "12345",
  name: "Ana García",
  email: "ana@ejemplo.com",
  role: "student",
  notifications: 3,
  courses: 4,
  progress: 68
};

const courses = [
  {
    id: '1',
    title: 'Matemáticas Avanzadas',
    instructor: 'Dr. Carlos Ruiz',
    progress: 75,
    color: '#3B82F6',
    nextLesson: 'Hoy, 14:00',
    totalLessons: 12,
    completedLessons: 9
  },
  {
    id: '2',
    title: 'Historia del Arte',
    instructor: 'Dra. Elena Morales',
    progress: 40,
    color: '#10B981',
    nextLesson: 'Mañana, 10:00',
    totalLessons: 10,
    completedLessons: 4
  },
  {
    id: '3',
    title: 'Programación en JavaScript',
    instructor: 'Prof. Javier López',
    progress: 90,
    color: '#F59E0B',
    nextLesson: 'Hoy, 16:00',
    totalLessons: 15,
    completedLessons: 13
  },
  {
    id: '4',
    title: 'Biología Molecular',
    instructor: 'Dr. Roberto Sánchez',
    progress: 30,
    color: '#8B5CF6',
    nextLesson: 'Miércoles, 11:00',
    totalLessons: 8,
    completedLessons: 2
  }
];

const upcomingClasses = [
  {
    id: '1',
    courseId: '1',
    title: 'Ecuaciones Diferenciales',
    time: '14:00 - 15:30',
    course: 'Matemáticas Avanzadas',
    room: 'Aula 302',
    instructor: 'Dr. Carlos Ruiz'
  },
  {
    id: '2',
    courseId: '3',
    title: 'Introducción a React',
    time: '16:00 - 18:00',
    course: 'Programación en JavaScript',
    room: 'Lab. Computación 2',
    instructor: 'Prof. Javier López'
  },
  {
    id: '3',
    courseId: '2',
    title: 'Arte Renacentista',
    time: '10:00 - 11:30',
    course: 'Historia del Arte',
    room: 'Aula 105',
    instructor: 'Dra. Elena Morales'
  }
];

const activities: Activity[] = [
  {
    id: '1',
    type: 'assignment' as Activity['type'],
    title: 'Tarea de Matemáticas entregada',
    course: 'Matemáticas Avanzadas',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Hace 2 horas
    status: 'completed'
  },
  {
    id: '2',
    type: 'quiz' as Activity['type'],
    title: 'Cuestionario de Historia calificado',
    course: 'Historia del Arte',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // Hace 5 horas
    status: 'completed',
    score: 8.5
  },
  {
    id: '3',
    type: 'announcement' as Activity['type'],
    title: 'Nuevo material disponible',
    course: 'Biología Molecular',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Hace 1 día
    status: 'pending'
  },
  {
    id: '4',
    type: 'lesson' as Activity['type'],
    title: 'Nueva lección publicada',
    course: 'Programación en JavaScript',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Hace 3 días
    status: 'pending'
  }
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : activeTab === 'in-progress' 
      ? courses.filter(course => course.progress > 0 && course.progress < 100)
      : courses.filter(course => course.progress === 100);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <LayoutWrapper user={userData}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de Bienvenida */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {greeting()}, {userData.name}!
              </h1>
              <p className="mt-2 text-gray-600">
                {currentTime.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Próxima clase</p>
              <p className="font-semibold">{upcomingClasses[0].title}</p>
              <p className="text-sm text-gray-600">
                {upcomingClasses[0].time} · {upcomingClasses[0].room}
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Cursos inscritos</h3>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500">Tareas completadas</h3>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-sm font-medium text-gray-500">Horas de estudio</h3>
            <p className="text-2xl font-bold">36</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-500">Logros</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filtros de Cursos */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Mis Cursos</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeTab === 'all'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setActiveTab('in-progress')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeTab === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    En progreso
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeTab === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Completados
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay cursos en esta categoría</p>
                </div>
              )}
            </div>

            {/* Actividades Recientes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Actividades Recientes</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Ver todas
                </button>
              </div>
              <RecentActivities activities={activities} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progreso General */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Progreso General</h3>
              <ProgressChart progress={userData.progress} />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600">Cursos activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">68%</div>
                  <div className="text-sm text-gray-600">Promedio</div>
                </div>
              </div>
            </div>

            {/* Próximas Clases */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Próximas Clases</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Ver calendario
                </button>
              </div>
              <UpcomingClasses classes={upcomingClasses} />
            </div>

            {/* Recordatorios */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recordatorios</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5">⚠️</div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Tarea de Matemáticas</p>
                    <p className="text-xs text-gray-500">Vence mañana a las 23:59</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">📚</div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Estudiar para examen</p>
                    <p className="text-xs text-gray-500">Próximo viernes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✅</div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Revisar feedback</p>
                    <p className="text-xs text-gray-500">Última tarea de Historia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}