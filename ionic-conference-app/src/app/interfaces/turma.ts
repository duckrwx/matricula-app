import { Disciplina } from './disciplina';
import { PeriodoLetivo } from './periodoLetivo';
import { Professor } from './professor';

export interface Turma {
  codigo: string;
  nome: string;
  cargaHorariaTotal?: number;
  vagasOfertadas: PeriodoLetivo;
  vagasOcupadas?: number;
  vagasDisponiveis?: number;
  periodoLetivo: PeriodoLetivo;
  disciplina: Disciplina;
  professor?: Professor;
  horario?: Horario
}

export interface TurmaData {
  turmas: Turma[];
}

export interface Horario {
  dia: string;
  horaInicio: string;
  horaFim: string;
}
