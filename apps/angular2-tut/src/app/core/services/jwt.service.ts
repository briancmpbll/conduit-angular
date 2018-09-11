import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly StorageKey = 'jwtToken';

  constructor() { }

  getToken(): string | null {
    return window.localStorage.getItem(this.StorageKey);
  }

  saveToken(token: string): void {
    window.localStorage.setItem(this.StorageKey, token);
  }

  destroyToken(): void {
    window.localStorage.removeItem(this.StorageKey);
  }
}
