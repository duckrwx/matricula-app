export interface Curriculo {
  codigo: string;
  status: string;
  periodoCriacao: PeriodoCriacao;
  prazos?: Prazo;
  cargaHoraria?: CargaHoraria;
}

export interface CurriculoData {
  curriculos: Curriculo[];
}

export interface PeriodoCriacao {
  ano: number;
  periodo: number;
}

export interface Prazo {
  minimo: number;
  maximo: number;
  medio: number;
}

export interface CargaHoraria {
  totalMinima: number;
  totalObrigatoria: number;
  minimoOptativa: number;
  maximoEletivos: number;
  maximoPeriodoLetivo: number;
  minimoPeridoLetivo: number;
}