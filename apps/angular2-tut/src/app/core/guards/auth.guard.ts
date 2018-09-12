import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppState } from '../../+state/app.reducer';
import { authQuery } from '../../auth/+state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(authQuery.getIsAuthenticated).pipe(first());
  }
}
