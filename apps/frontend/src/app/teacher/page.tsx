// src/app/teacher/dashboard/page.tsx
"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

// Datos de ejemplo para el profesor
const teacherData = {
  id: "t9876",
  name: "Dr. Carlos Ruiz",
  email: "carlos.ruiz@eduplus.com",
  role: "teacher",
  notifications: 5,
  courses: 3,
  students: 142
};

const courses = [
  {
    id: '1',
    title: 'Matemáticas Avanzadas',
    code: 'MAT-301',
    students: 48,
    assignments: 12,
    ungraded: 3,
    progress: 75,
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Cálculo Diferencial',
    code: 'MAT-202',
    students: 52,
    assignments: 8,
    ungraded: 5,
    progress: 60,
    color: '#10B981'
  },
  {
    id: '3',
    title: 'Álgebra Lineal',
    code: 'MAT-105',
    students: 42,
    assignments: 10,
    ungraded: 2,
    progress: 85,
    color: '#F59E0B'
  }
];

const assignments = [
  {
    id: '1',
    title: 'Tarea 4: Ecuaciones Diferenciales',
    course: 'Matemáticas Avanzadas',
    dueDate: '2023-11-15',
    submissions: 42,
    graded: 39,
    status: 'grading'
  },
  {
    id: '2',
    title: 'Examen Parcial 2',
    course: 'Cálculo Diferencial',
    dueDate: '2023-11-10',
    submissions: 48,
    graded: 48,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Proyecto Grupal',
    course: 'Álgebra Lineal',
    dueDate: '2023-11-20',
    submissions: 10,
    graded: 0,
    status: 'pending'
  }
];

const announcements = [
  {
    id: '1',
    title: 'Cambio de aula para la clase de hoy',
    course: 'Matemáticas Avanzadas',
    date: '2023-11-05',
    views: 42
  },
  {
    id: '2',
    title: 'Extensión de fecha para la tarea 3',
    course: 'Cálculo Diferencial',
    date: '2023-11-03',
    views: 48
  },
  {
    id: '3',
    title: 'Material adicional para el próximo tema',
    course: 'Álgebra Lineal',
    date: '2023-11-01',
    views: 35 
  }
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <LayoutWrapper user={teacherData}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Panel del Profesor
          </h1>
          <p className="mt-2 text-gray-600">
            Bienvenido, {teacherData.name}. Aquí puedes gestionar tus cursos y estudiantes.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Cursos impartidos</h3>
            <p className="text-2xl font-bold">{teacherData.courses}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500">Estudiantes</h3>
            <p className="text-2xl font-bold">{teacherData.students}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-sm font-medium text-gray-500">Tareas por calificar</h3>
            <p className="text-2xl font-bold">10</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-500">Promedio general</h3>
            <p className="text-2xl font-bold">8.2/10</p>
          </div>
        </div>

        {/* Pestañas */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-auto">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resumen
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'courses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cursos
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'assignments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tareas
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'announcements'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Anuncios
              </button>
            </nav>
          </div>
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cursos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Mis Cursos</h2>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-4"
                          style={{ backgroundColor: course.color }}
                        >
                          {course.title.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-gray-500">{course.code} · {course.students} estudiantes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{course.ungraded} por calificar</div>
                        <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          Gestionar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tareas pendientes */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Tareas Pendientes</h2>
                <div className="space-y-4">
                  {assignments.filter(a => a.status !== 'completed').map((assignment) => (
                    <div key={assignment.id} className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-sm">{assignment.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{assignment.course}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Entrega: {new Date(assignment.dueDate).toLocaleDateString('es-ES')}
                        </span>
                        <span className="text-xs font-medium">
                          {assignment.graded}/{assignment.submissions} calificados
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Gestión de Cursos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Curso
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estudiantes
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tareas
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white mr-3"
                            style={{ backgroundColor: course.color }}
                          >
                            {course.title.charAt(0)}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.assignments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Estudiantes</button>
                        <button className="text-red-600 hover:text-red-900">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gestión de Tareas</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Nueva Tarea
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarea
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Curso
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de entrega
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entregas
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(assignment.dueDate).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.submissions} / {assignment.graded} calificadas
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          assignment.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : assignment.status === 'grading'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {assignment.status === 'completed' ? 'Completado' : 
                           assignment.status === 'grading' ? 'Calificando' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Ver</button>
                        <button className="text-green-600 hover:text-green-900 mr-3">Calificar</button>
                        <button className="text-red-600 hover:text-red-900">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Anuncios</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Nuevo Anuncio
              </button>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{announcement.title}</h3>
                      <p className="text-sm text-gray-600">{announcement.course}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(announcement.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{announcement.views} visualizaciones</span>
                    <div>
                      <button className="text-blue-600 hover:text-blue-900 text-sm mr-3">Editar</button>
                      <button className="text-red-600 hover:text-red-900 text-sm">Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}