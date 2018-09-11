import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { User, AuthCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

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

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  populate() {
    if (this.jwtService.getToken()) {
      this.http.get<{user: User}>('/user').subscribe(
        data => this.setAuth(data.user),
        () => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  update(user: User): Observable<User> {
    return this.http.put<{user: User}>('/user', { user }).pipe(
    map(data => {
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User);
    this.isAuthenticatedSubject.next(false);
  }

  private setAuth(user: User) {
    this.jwtService.saveToken(user.token as string);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }
}