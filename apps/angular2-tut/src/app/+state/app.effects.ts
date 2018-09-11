import { JwtService } from './../core/services/jwt.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AppState } from './app.reducer';
import {
  LoadApp,
  AppLoaded,
  AppLoadError,
  AppActionTypes,
  LoginAction,
  LoginSuccessAction,
  LoginErrorAction,
  ExistingUserSuccessAction,
} from './app.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AppEffects {
  @Effect()
  loadApp$ = this.dataPersistence.fetch(AppActionTypes.LoadApp, {
    run: (action: LoadApp, state: AppState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return new AppLoaded([]);
    },

    onError: (action: LoadApp, error) => {
      console.error('Error', error);
      return new AppLoadError(error);
    }
  });

  @Effect()
  appLoaded$ = this.actions$.pipe(
    ofType<AppLoaded>(AppActionTypes.AppLoaded),
    mergeMap(() => {
      return this.userService.getLoggedInUser().pipe(
        map(user => new ExistingUserSuccessAction(user)),
        catchError(() => of({type: 'NO_ACTION'}))
      );
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AppActionTypes.Login),
    mergeMap(loginAction => {
      return this.userService.attemptAuth('login', loginAction.payload).pipe(
        map(user => new LoginSuccessAction(user)),
        catchError(err => of(new LoginErrorAction(err))),
      );
    })
  );

  @Effect({dispatch: false})
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccessAction>(AppActionTypes.LoginSuccess),
    tap(loginSuccessAction => {
      this.jwtService.saveToken(loginSuccessAction.payload.token as string);
      this.router.navigateByUrl('/');
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AppState>,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router
  ) {}
}
