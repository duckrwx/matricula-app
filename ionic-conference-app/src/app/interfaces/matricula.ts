import { Aluno } from "./aluno";
import { Turma } from "./turma";

export interface Matricula {
  prioridade: number;
  status: string;
  data: string;
  motivoIndeferimento: string;
  aluno?: Aluno;
  turma?: Turma;
}

export interface MatriculaData {
  matricula: Matricula[];
}
