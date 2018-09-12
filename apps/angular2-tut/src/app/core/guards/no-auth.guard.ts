import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { AppState } from './../../+state/app.reducer';
import { authQuery } from '../../auth/+state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(authQuery.getIsAuthenticated).pipe(
      first(),
      map(isAuthenticated => !isAuthenticated)
    );
  }
}
