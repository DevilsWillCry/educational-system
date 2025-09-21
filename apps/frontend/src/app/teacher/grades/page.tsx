"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { configuraciones, estudiantes } from "@/config/institutionsConfig";
import { 
  InstitutionConfig, 
  SavedData, 
  SavedMetas, 
  SavedConfigs, 
  ChangeHistoryItem,
  Student 
} from "@/types/grades";
import InstitutionalGradesTable from "@/components/grades/InstitutionalGradesTable";

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

export default function TeacherGrades() {
  const [selectedInstitucion, setSelectedInstitucion] = useState<string>("Institución 1");
  const [selectedGrupo, setSelectedGrupo] = useState<string>("");
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>("");
  const [metaAprendizaje, setMetaAprendizaje] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [changeHistory, setChangeHistory] = useState<ChangeHistoryItem[]>([]);
  const [currentStudents, setCurrentStudents] = useState<Student[]>([]);
  
  const [datosGuardados, setDatosGuardados] = useState<SavedData>({});
  const [metasGuardadas, setMetasGuardadas] = useState<SavedMetas>({});
  const [configuracionesGuardadas, setConfiguracionesGuardadas] = useState<SavedConfigs>({});
  
  const hotTableRef = useRef<any>(null);
  const isInitialLoad = useRef(true);

  // ✅ Inicializar selects
  useEffect(() => {
    if (selectedInstitucion && Object.keys(estudiantes[selectedInstitucion]).length > 0) {
      const grupos = Object.keys(estudiantes[selectedInstitucion]);
      setSelectedGrupo(grupos[0]);
    }
  }, [selectedInstitucion]);

  useEffect(() => {
    if (selectedInstitucion && configuraciones[selectedInstitucion]) {
      setSelectedPeriodo(configuraciones[selectedInstitucion].periodos[0]);
    }
  }, [selectedInstitucion]);

  // ✅ Actualizar estudiantes actuales
  useEffect(() => {
    if (selectedInstitucion && selectedGrupo) {
      const students = estudiantes[selectedInstitucion]?.[selectedGrupo] || [];
      setCurrentStudents(students);
    }
  }, [selectedInstitucion, selectedGrupo]);

  // ✅ Cargar meta solamente
  useEffect(() => {
    if (selectedInstitucion && selectedGrupo && selectedPeriodo) {
      const meta = metasGuardadas[selectedInstitucion]?.[selectedGrupo]?.[selectedPeriodo] || "";
      setMetaAprendizaje(meta);
    }
  }, [selectedInstitucion, selectedGrupo, selectedPeriodo, metasGuardadas]);

  // ✅ Obtener configuración actual
  const obtenerConfiguracion = useCallback((): InstitutionConfig => {
    if (!selectedInstitucion) return configuraciones["Institución 1"];
    
    // Usar configuración guardada o la predeterminada
    const savedConfig = configuracionesGuardadas[selectedInstitucion]?.[selectedGrupo]?.[selectedPeriodo];
    return savedConfig || JSON.parse(JSON.stringify(configuraciones[selectedInstitucion]));
  }, [selectedInstitucion, selectedGrupo, selectedPeriodo, configuracionesGuardadas]);

  // ✅ Guardar meta de aprendizaje
  const guardarMeta = useCallback(() => {
    if (selectedInstitucion && selectedGrupo && selectedPeriodo) {
      setMetasGuardadas(prev => ({
        ...prev,
        [selectedInstitucion]: {
          ...prev[selectedInstitucion],
          [selectedGrupo]: {
            ...prev[selectedInstitucion]?.[selectedGrupo],
            [selectedPeriodo]: metaAprendizaje
          }
        }
      }));
    }
  }, [selectedInstitucion, selectedGrupo, selectedPeriodo, metaAprendizaje]);

  // ✅ Manejar cambios en la tabla
  const handleTableDataChange = useCallback((newData: any[][]) => {
    if (selectedInstitucion && selectedGrupo && selectedPeriodo) {
      setDatosGuardados(prev => ({
        ...prev,
        [selectedInstitucion]: {
          ...prev[selectedInstitucion],
          [selectedGrupo]: {
            ...prev[selectedInstitucion]?.[selectedGrupo],
            [selectedPeriodo]: newData
          }
        }
      }));
    }
  }, [selectedInstitucion, selectedGrupo, selectedPeriodo]);

  // ✅ Registrar cambio en historial
  const registrarCambio = useCallback((accion: 'add' | 'remove', bloque: string) => {
    const nuevoCambio: ChangeHistoryItem = {
      id: Date.now().toString(),
      accion,
      bloque,
      timestamp: new Date().toLocaleTimeString(),
      description: `${accion === 'add' ? 'Agregada' : 'Eliminada'} columna en ${bloque}`
    };

    setChangeHistory(prev => [nuevoCambio, ...prev.slice(0, 4)]);
  }, []);

  // ✅ Agregar columna a bloque
  const agregarColumnaABloque = useCallback((bloqueIndex: number) => {
    const config = obtenerConfiguracion();
    const bloque = config.bloques[bloqueIndex];

    if (bloque.subCols.length >= 10) {
      alert("Máximo 10 columnas por bloque");
      return;
    }

    const nextNum = bloque.subCols.length + 1;
    bloque.subCols.push(`P${nextNum}`);

    setConfiguracionesGuardadas(prev => ({
      ...prev,
      [selectedInstitucion]: {
        ...prev[selectedInstitucion],
        [selectedGrupo]: {
          ...prev[selectedInstitucion]?.[selectedGrupo],
          [selectedPeriodo]: config
        }
      }
    }));

    registrarCambio('add', bloque.nombre);
  }, [selectedInstitucion, selectedGrupo, selectedPeriodo, obtenerConfiguracion, registrarCambio]);

  // ✅ Eliminar columna de bloque
  const eliminarUltimaColumnaBloque = useCallback((bloqueIndex: number) => {
    const config = obtenerConfiguracion();
    const bloque = config.bloques[bloqueIndex];

    if (bloque.subCols.length <= 1) {
      alert("Debe haber al menos una columna por bloque");
      return;
    }

    bloque.subCols.pop();

    setConfiguracionesGuardadas(prev => ({
      ...prev,
      [selectedInstitucion]: {
        ...prev[selectedInstitucion],
        [selectedGrupo]: {
          ...prev[selectedInstitucion]?.[selectedGrupo],
          [selectedPeriodo]: config
        }
      }
    }));

    registrarCambio('remove', bloque.nombre);
  }, [selectedInstitucion, selectedGrupo, selectedPeriodo, obtenerConfiguracion, registrarCambio]);

  // ✅ Renderizar controles de la interfaz
  const renderControles = () => {
    const config = obtenerConfiguracion();

    return (
      <div className="space-y-6">
        {/* Controles principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="control-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institución:
            </label>
            <select
              value={selectedInstitucion}
              onChange={(e) => setSelectedInstitucion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(configuraciones).map(inst => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grupo:
            </label>
            <select
              value={selectedGrupo}
              onChange={(e) => setSelectedGrupo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedInstitucion && Object.keys(estudiantes[selectedInstitucion] || {}).map(grupo => (
                <option key={grupo} value={grupo}>{grupo}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Período:
            </label>
            <select
              value={selectedPeriodo}
              onChange={(e) => setSelectedPeriodo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedInstitucion && configuraciones[selectedInstitucion]?.periodos.map((periodo)=> (
                <option key={periodo} value={periodo}>{periodo}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Meta de aprendizaje */}
        <div className="learning-goal">
          <h3 className="text-lg font-semibold mb-2">Meta de Aprendizaje para el Grupo:</h3>
          <input
            type="text"
            value={metaAprendizaje}
            onChange={(e) => setMetaAprendizaje(e.target.value)}
            onBlur={guardarMeta}
            placeholder="Escribe aquí la meta de aprendizaje para todo el grupo..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gestión de columnas */}
        <div className="add-column-section">
          <h3 className="text-lg font-semibold mb-4">Gestión de Columnas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.bloques.map((bloque, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="column-title flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-blue-600 font-bold">{bloque.subCols.length}</span>
                  </div>
                  <h4 className="font-medium">{bloque.nombre}</h4>
                </div>
                
                <div className="column-buttons flex space-x-2">
                  <button
                    onClick={() => agregarColumnaABloque(index)}
                    disabled={bloque.subCols.length >= 10}
                    className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => eliminarUltimaColumnaBloque(index)}
                    disabled={bloque.subCols.length <= 1}
                    className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Eliminar
                  </button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  Columnas: {bloque.subCols.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historial de cambios */}
        {changeHistory.length > 0 && (
          <div className="history-panel bg-gray-50 p-4 rounded-lg">
            <div className="history-title flex items-center mb-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <span className="text-gray-600">📋</span>
              </div>
              <h3 className="text-lg font-semibold">Historial de Cambios</h3>
            </div>
            <div className="history-list space-y-2">
              {changeHistory.map((cambio) => (
                <div key={cambio.id} className="history-item bg-white p-2 rounded text-sm">
                  <div className="flex items-center">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                      cambio.accion === 'add' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {cambio.accion === 'add' ? '+' : '-'}
                    </span>
                    <span>{cambio.description}</span>
                    <span className="ml-auto text-gray-400 text-xs">{cambio.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <LayoutWrapper user={teacherData}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            EduPlus 📚 - Sistema de Calificaciones
          </h1>
          <p className="mt-2 text-gray-600">
            Sistema completo para gestión de calificaciones con columnas personalizables
          </p>
        </div>

        {/* Controles */}
        {renderControles()}

        {/* Tabla de calificaciones */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Tabla de Calificaciones</h3>
          {selectedInstitucion && selectedGrupo && selectedPeriodo && currentStudents.length > 0 ? (
            <InstitutionalGradesTable
              key={`${selectedInstitucion}-${selectedGrupo}-${selectedPeriodo}`}
              config={obtenerConfiguracion()}
              estudiantes={currentStudents}
              isEditing={isEditing}
              onDataChange={handleTableDataChange}
              initialData={datosGuardados[selectedInstitucion]?.[selectedGrupo]?.[selectedPeriodo]}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <p>Selecciona una institución, grupo y período para ver la tabla</p>
            </div>
          )}
        </div>


        {/* Botones de acción */}
        <div className="mt-8 flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <span className="flex items-center">
              <span className="mr-2">💾</span>
              Guardar Cambios
            </span>
          </button>
          
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <span className="flex items-center">
              <span className="mr-2">📤</span>
              Exportar Excel
            </span>
          </button>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg ${
              isEditing 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            <span className="flex items-center">
              <span className="mr-2">{isEditing ? '🔒' : '✏️'}</span>
              {isEditing ? 'Bloquear' : 'Editar'}
            </span>
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}