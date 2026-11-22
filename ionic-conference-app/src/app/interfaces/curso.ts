import { Professor } from "./professor";
import { Unidade } from "./unidade";

export interface Curso {
  codigo: string;
  nome: string;
  nivel: string;
  modalidade: string;
  coordenador: Professor;
  unidade: Unidade;
}

