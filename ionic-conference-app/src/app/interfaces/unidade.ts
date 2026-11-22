import { Curriculo } from './curriculo';
import { Curso } from './curso';
import { PeriodoLetivo } from './periodoLetivo';

export interface Unidade {
  codigo: string;
  nome: string;
  tipo: string;
  campus: string;
}

export interface UnidadeData {
  unidades: Unidade[];
}
