import { Aluno } from "./aluno";
import { Matricula } from "./matricula";
import { PeriodoLetivo } from "./periodoLetivo";

export interface Matriculas {
  periodoLetivo: PeriodoLetivo;
  aluno: Aluno;
  matriculas: Matricula[];
}

export interface MatriculasData {
  matriculas: Matriculas[];
}
