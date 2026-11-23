import { Aluno } from "./aluno";
import { Matricula } from "./matricula";
import { PeriodoLetivo } from "./periodoLetivo";

export interface Matriculas {
  periodoLetivo: PeriodoLetivo;
  aluno: Aluno;
  matricula: Matricula[];
}

