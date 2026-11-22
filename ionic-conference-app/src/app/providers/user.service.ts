import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom, map, of } from 'rxjs';
import { UserData, UserOptions } from '../interfaces/user-options';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storage = inject(Storage);
  private http = inject(HttpClient);

  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  data: UserData | null = null;

  load() {
    if (this.data) {
      return of(this.data);
    }

    return this.http
      .get<UserData>('assets/data/Users.json')
      .pipe(map(data => this.processData(data)));
  }

  processData(data: UserData): UserData {
    this.data = data;
    return data;
  }

  getUsers() {
    return this.load().pipe(map((data: UserData) => data.user));
  }

  hasFavorite(sessionName: string): boolean {
    return this.favorites.indexOf(sessionName) > -1;
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  async login(login: UserOptions): Promise<boolean> {
    try {
      await firstValueFrom(this.load());
    } catch {
      await this.clearSession();
      window.dispatchEvent(new CustomEvent('user:loginError'));
      return false;
    }

    if (this.autenticar(login)) {
      await this.storage.set(this.HAS_LOGGED_IN, true);
      await this.setUsername(login.username);
      window.dispatchEvent(new CustomEvent('user:login'));
      return true;
    }

    await this.clearSession();
    window.dispatchEvent(new CustomEvent('user:loginError'));
    return false;
  }

  autenticar(login: UserOptions): boolean {
    return (
      this.data?.user.some(
        user =>
          user.username === login.username && user.password === login.password
      ) ?? false
    );
  }

  signup(username: string): Promise<boolean> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  async logout(): Promise<void> {
    await this.clearSession();
    window.dispatchEvent(new CustomEvent('user:logout'));
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then(value => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then(value => {
      return value === true;
    });
  }

  private async clearSession(): Promise<void> {
    await this.storage.remove(this.HAS_LOGGED_IN);
    await this.storage.remove('username');
  }
}
