import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, map, of, tap } from 'rxjs';
import { Aluno, AlunoData } from '../interfaces/aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private http = inject(HttpClient);
  private data: Aluno[] | null = null;

  load(): Observable<Aluno[]> {
    if (this.data) {
      return of(this.data);
    }

    return this.http
      .get<AlunoData>('assets/data/Alunos.json')
      .pipe(
        map(data => data.alunos),
        tap(alunos => (this.data = alunos))
      );
  }

  async getAluno(matricula: string): Promise<Aluno> {
    const alunos = await firstValueFrom(this.load());
    const aluno = alunos.find(item => item.matricula === matricula);

    if (!aluno) {
      return Promise.reject(new Error(`Aluno ${matricula} não encontrado.`));
    }

    return aluno;
  }
}
