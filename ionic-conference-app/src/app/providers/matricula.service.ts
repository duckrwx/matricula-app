import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, of, tap } from 'rxjs';
import { Matriculas } from '../interfaces/matriculas';

@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private http = inject(HttpClient);
  private data: Matriculas | null = null;

  load(): Observable<Matriculas> {
    if (this.data) {
      return of(this.data);
    }

    return this.http
      .get<Matriculas>('assets/data/Matriculas.json')
      .pipe(tap(matriculas => (this.data = matriculas)));
  }

  async getMatriculas(matriculaAluno: string): Promise<Matriculas> {
    const matriculas = await firstValueFrom(this.load());

    if (matriculas.aluno.matricula !== matriculaAluno) {
      throw new Error(`Aluno ${matriculaAluno} não encontrado.`);
    }
    return matriculas;
    }
}
