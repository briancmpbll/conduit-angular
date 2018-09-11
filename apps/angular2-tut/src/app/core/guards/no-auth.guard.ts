import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { appQuery } from '../../+state/app.selectors';
import { AppState } from './../../+state/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(appQuery.getIsAuthenticated).pipe(
      first(),
      map(isAuthenticated => !isAuthenticated)
    );
  }
}
