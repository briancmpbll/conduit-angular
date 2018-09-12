import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppState } from '../+state/app.reducer';
import { authQuery } from '../auth/+state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolverGuard implements Resolve<boolean> {
  constructor(
    private store: Store<AppState>
  ) {}

  resolve(): Observable<boolean> {
    return this.store.select(authQuery.getIsAuthenticated).pipe(first());
  }
}
