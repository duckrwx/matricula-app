import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { Aluno } from '../../interfaces/aluno';
import { AlunoService } from '../../providers/aluno.service';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonSpinner,
  ],
})
export class AccountPage implements OnInit {
  private router = inject(Router);
  private user = inject(UserService);
  private alunoService = inject(AlunoService);

  aluno = signal<Aluno | null>(null);
  erro = signal('');
  carregando = signal(true);

  async ngOnInit() {
    const [matricula, loggedIn] = await Promise.all([
      this.user.getUsername(),
      this.user.isLoggedIn(),
    ]);

    if (!loggedIn || !matricula) {
      this.carregando.set(false);
      await this.router.navigateByUrl('/login');
      return;
    }

    try {
      this.aluno.set(await this.alunoService.getAluno(matricula));
    } catch {
      this.erro.set('Não foi possível carregar os dados acadêmicos do aluno.');
    } finally {
      this.carregando.set(false);
    }
  }

  async logout() {
    await this.user.logout();
    await this.router.navigateByUrl('/login');
  }
}
