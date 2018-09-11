import { appQuery } from './../../+state/app.selectors';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../../+state/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(appQuery.getIsAuthenticated).pipe(take(1));
  }
}
