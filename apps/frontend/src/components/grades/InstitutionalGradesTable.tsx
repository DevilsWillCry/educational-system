"use client";

import { useRef, useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import { InstitutionConfig, Student } from '@/types/grades';

registerAllModules();

interface InstitutionalGradesTableProps {
  config: InstitutionConfig;
  estudiantes: Student[];
  isEditing: boolean;
  onDataChange: (data: any[][]) => void;
  initialData?: any[][];
}

export default function InstitutionalGradesTable({ 
  config, 
  estudiantes, 
  isEditing, 
  onDataChange,
  initialData
}: InstitutionalGradesTableProps) {
  const hotTableRef = useRef<any>(null);
  const [columns, setColumns] = useState<any[]>([]);
  const [nestedHeaders, setNestedHeaders] = useState<any[][]>([]);
  const isRecalculating = useRef(false);
  const previousData = useRef<any[][]>([]);

  // ✅ Generar columnas y headers
  useEffect(() => {
    const newColumns: any[] = [
      {
        data: 0,
        type: "text",
        readOnly: true,
        width: "auto",
        className: "htMiddle",
        renderer: function(instance: any, td: any, row: any, col: any, prop: any, value: any) {
          td.style.fontWeight = "600";
          td.style.color = "#1a237e";
          td.style.background = "#f5f7ff";
          td.textContent = value;
          return td;
        },
      },
    ];

    const headerFila1: any[] = [{ label: "Estudiantes", colspan: 1 }];
    const headerFila2: any[] = ["Nombre"];

    config.bloques.forEach((bloque) => {
      headerFila1.push({
        label: bloque.nombre,
        colspan: bloque.subCols.length + 1,
      });

      // Añadir subcolumnas como checkboxes
      bloque.subCols.forEach((sub) => {
        headerFila2.push(sub);
        newColumns.push({ 
          type: "checkbox", 
          className: "htCenter",
          readOnly: !isEditing,
          width: 50,
        });
      });

      // Añadir columna de nota
      headerFila2.push("Nota");
      newColumns.push({
        type: "numeric",
        readOnly: true,
        numericFormat: { pattern: "0.00" },
        className: "htCenter",
        width: 60,
        renderer: function(instance: any, td: any, row: any, col: any, prop: any, value: any) {
          td.textContent = value !== undefined && value !== null ? value.toFixed(2) : '0.00';
          
          // Colorear según la nota
          if (value >= 4) td.style.background = "#e8f5e9";
          else if (value >= 3) td.style.background = "#fff8e1";
          else if (value > 0) td.style.background = "#ffebee";
          
          td.style.fontWeight = "bold";
          return td;
        },
      });
    });

    setColumns(newColumns);
    setNestedHeaders([headerFila1, headerFila2]);
  }, [config, isEditing]);

  // ✅ Crear datos iniciales
  const createInitialData = () => {
    if (initialData && initialData.length > 0) {
      previousData.current = JSON.parse(JSON.stringify(initialData));
      return initialData;
    }
    
    const newData = estudiantes.map(estudiante => {
      const fila: any[] = [estudiante.name];
      
      config.bloques.forEach(bloque => {
        // Añadir checkboxes (false para desmarcado)
        bloque.subCols.forEach(() => fila.push(false));
        // Añadir columna de nota (0 inicial)
        fila.push(0);
      });
      
      return fila;
    });
    
    previousData.current = JSON.parse(JSON.stringify(newData));
    return newData;
  };

  // ✅ Recalcular notas (optimizado para checkboxes)
  const recalcularNotas = (changes: any[][] | null, source: string) => {
    // Evitar recursión y procesar solo cambios del usuario
    if (isRecalculating.current || source === 'loadData' || !hotTableRef.current) return;
    
    isRecalculating.current = true;
    
    const hot = hotTableRef.current.hotInstance;
    if (!hot) {
      isRecalculating.current = false;
      return;
    }
    
    const data = hot.getData();
    const newData = JSON.parse(JSON.stringify(data)); // Deep copy

    // Recalcular todas las filas
    for (let rowIndex = 0; rowIndex < newData.length; rowIndex++) {
      const fila = newData[rowIndex];
      let colIndex = 1; // Empezar después del nombre

      config.bloques.forEach(bloque => {
        const checks = [];
        
        // Obtener valores de checkboxes
        for (let i = 0; i < bloque.subCols.length; i++) {
          const value = fila[colIndex + i];
          // Convertir a booleano
          checks.push(value === true || value === 'true' || value === 1);
        }

        // Calcular nota según el método
        let nota = 0;
        if (bloque.calculo === "suma") {
          nota = checks.reduce((acc: number, v: boolean) => acc + (v ? 5 : 0), 0);
        } else if (bloque.calculo === "maximo" || bloque.calculo === "máximo") {
          const valores = checks.map((v: boolean) => v ? 5 : 0);
          nota = valores.length > 0 ? Math.max(...valores) : 0;
        } else {
          // promedio por defecto
          const total = checks.filter(Boolean).length;
          nota = bloque.subCols.length > 0 ? (total / bloque.subCols.length) * 5 : 0;
        }

        // Actualizar la nota
        fila[colIndex + bloque.subCols.length] = parseFloat(nota.toFixed(2));
        colIndex += bloque.subCols.length + 1;
      });
    }

    // Comparar si los datos han cambiado antes de actualizar
    const dataString = JSON.stringify(newData);
    const previousDataString = JSON.stringify(previousData.current);
    
    if (dataString !== previousDataString) {
      // Actualizar tabla sin disparar eventos de cambio
      setTimeout(() => {
        if (hotTableRef.current && hotTableRef.current.hotInstance) {
          hotTableRef.current.hotInstance.loadData(newData, {
            source: 'loadData' // Usar source específica para evitar recursión
          });
          onDataChange(newData);
          previousData.current = JSON.parse(JSON.stringify(newData));
        }
        isRecalculating.current = false;
      }, 10);
    } else {
      isRecalculating.current = false;
    }
  };

  return (
    <div className="hot-table-container">
      <HotTable
        ref={hotTableRef}
        data={createInitialData()}
        columns={columns}
        nestedHeaders={nestedHeaders}
        rowHeaders={true}
        colHeaders={true}
        licenseKey="non-commercial-and-evaluation"
        height="auto"
        manualRowResize={true}
        manualColumnResize={true}
        contextMenu={isEditing}
        columnSorting={true}
        afterChange={recalcularNotas}
        stretchH="all"
        className="htCenter htMiddle"
      />
    </div>
  );
}