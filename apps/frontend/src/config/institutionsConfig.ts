// src/config/institutionsConfig.ts
import { InstitutionConfig, InstitutionData } from '@/types/grades';

export const configuraciones: { [key: string]: InstitutionConfig } = {
  "Institución 1": {
    periodos: ["Periodo 1", "Periodo 2", "Periodo 3"],
    bloques: [
      {
        nombre: "Cognitivo",
        subCols: ["P1", "P2", "P3"],
        calculo: "promedio",
      },
      {
        nombre: "Procedimental",
        subCols: ["P1", "P2", "P3"],
        calculo: "promedio",
      },
      {
        nombre: "Actitudinal",
        subCols: ["P1"],
        calculo: "promedio",
      }
    ],
  },
  "Institución 2": {
    periodos: ["Periodo Único"],
    bloques: [
      {
        nombre: "Periodo",
        subCols: ["P1", "P2", "P3", "P4"],
        calculo: "promedio",
      },
    ],
  },
  "Institución 3": {
    periodos: ["Periodo 1", "Periodo 2"],
    bloques: [
      {
        nombre: "Única",
        subCols: ["P1", "P2", "P3", "P4"],
        calculo: "promedio",
      },
    ],
  },
};

export const estudiantes: { [key: string]: InstitutionData } = {
  "Institución 1": {
    "8-1": [
      { id: 1, name: "Juan Pérez" },
      { id: 2, name: "María Gómez" },
      { id: 3, name: "Andrés Torres" },
      { id: 4, name: "Laura Martínez" },
    ],
    "8-2": [
      { id: 5, name: "Pedro Rojas" },
      { id: 6, name: "Ana Fernández" },
    ],
  },
  "Institución 2": {
    "7-1": [
      { id: 7, name: "Luis Castillo" },
      { id: 8, name: "Carmen Díaz" },
    ],
    "7-2": [
      { id: 9, name: "Miguel López" },
      { id: 10, name: "Daniela Ruiz" },
    ],
  },
  "Institución 3": {
    "9-1": [
      { id: 11, name: "Sofía Herrera" },
      { id: 12, name: "Mateo García" },
    ],
  },
};