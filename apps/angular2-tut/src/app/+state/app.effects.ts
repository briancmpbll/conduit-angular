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
} from './app.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { of } from 'rxjs';

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
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AppActionTypes.Login),
    mergeMap(loginAction => {
      return this.userService.attemptAuth('login', loginAction.payload).pipe(
        map(user => new LoginSuccessAction(user)),
        catchError(err => of(new LoginErrorAction(err))),
      );
    })
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccessAction>(AppActionTypes.LoginSuccess),
    map(loginSuccessAction => this.jwtService.saveToken(loginSuccessAction.payload.token as string))
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AppState>,
    private userService: UserService,
    private jwtService: JwtService
  ) {}
}
