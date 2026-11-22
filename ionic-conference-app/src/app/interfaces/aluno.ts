import { Curriculo } from './curriculo';
import { Curso } from './curso';
import { PeriodoLetivo } from './periodoLetivo';

export interface Aluno {
  matricula: string;
  nome: string;
  ira: number;
  status: string;
  periodoIngresso: PeriodoLetivo;
  curso?: Curso;
  curriculo: Curriculo;
}

export interface AlunoData {
  alunos: Aluno[];
}
