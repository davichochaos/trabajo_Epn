export interface Materias {
  nombreMat: string;
  codigo: string;
  semestre: number;
  creditos?: number;
  cp?: number;
  cd?: number;
  totalHoras?: number;
  carreras: string[];
}
