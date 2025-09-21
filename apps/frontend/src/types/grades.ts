// src/types/grades.ts
export interface Process {
  id: string;
  name: string;
}

export interface EvaluationBlock {
  nombre: string;
  subCols: string[];
  calculo: 'promedio' | 'suma' | 'maximo' | 'máximo';
}

export interface InstitutionConfig {
  periodos: string[];
  bloques: EvaluationBlock[];
}

export interface Student {
  id: number;
  name: string;
}

export interface InstitutionData {
  [grupo: string]: Student[];
}

export interface SavedData {
  [institucion: string]: {
    [grupo: string]: {
      [periodo: string]: any[][];
    };
  };
}

export interface SavedMetas {
  [institucion: string]: {
    [grupo: string]: {
      [periodo: string]: string;
    };
  };
}

export interface SavedConfigs {
  [institucion: string]: {
    [grupo: string]: {
      [periodo: string]: InstitutionConfig;
    };
  };
}

export interface ChangeHistoryItem {
  id: string;
  accion: 'add' | 'remove';
  bloque: string;
  timestamp: string;
  description: string;
}

