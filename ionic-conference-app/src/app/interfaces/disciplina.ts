import { Unidade } from './unidade';

export interface Disciplina {
  codigo: string;
  nome: string;
  cargaHorariaTotal?: number;
  modalidade: string;
  cargaHoraria?: CargaHoraria;
  preRequisito?: PreRequisito[];
  unidade: Unidade;
}

export interface CargaHoraria {
  teorica: number;
  pratica: number;
  extensionista: number;
}

export interface PreRequisito {
  codigo: string;
  nome: string;
}

export interface DisciplinaData {
  disciplinas: Disciplina[];
}
