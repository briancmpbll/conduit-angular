import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { User, AuthCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  private setAuth(user: User) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(type: string, credentials: AuthCredentials): Observable<User> {
    const route = (type === 'login') ? 'login' : '';
    return this.http.post<{user: User}>(`/users/${route}`, {
      user: credentials
    }).pipe(map(data => {
      this.setAuth(data.user);
      return data.user;
    }));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
