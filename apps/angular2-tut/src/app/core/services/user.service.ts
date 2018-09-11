import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthCredentials, User } from '../models/user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
  ) { }

  attemptAuth(type: string, credentials: AuthCredentials): Observable<User> {
    const route = (type === 'login') ? 'login' : '';
    return this.http.post<{user: User}>(`/users/${route}`, {
      user: credentials
    }).pipe(map(data => data.user));
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<{user: User}>('/user').pipe(
      map(data => data.user)
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<{user: User}>('/user', { user }).pipe(
    map(data => {
      return data.user;
    }));
  }
}
