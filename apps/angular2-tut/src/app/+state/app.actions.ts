import { AuthCredentials, User } from './../core/models/user.model';
import { Action } from '@ngrx/store';
import { Entity } from './app.reducer';
import { Errors } from '../core/models/errors.model';

export enum AppActionTypes {
  LoadApp = '[App] Load App',
  AppLoaded = '[App] App Loaded',
  AppLoadError = '[App] App Load Error',
  Login = '[App] Login',
  LoginSuccess = '[App] Login Success',
  LoginError = '[App] Login Error',
  ExistingUserSuccess = '[App] Existing User Success'
}

export class LoadApp implements Action {
  readonly type = AppActionTypes.LoadApp;
}

export class AppLoadError implements Action {
  readonly type = AppActionTypes.AppLoadError;
  constructor(public payload: any) {}
}

export class AppLoaded implements Action {
  readonly type = AppActionTypes.AppLoaded;
  constructor(public payload: Entity[]) {}
}

export class LoginAction implements Action {
  readonly type = AppActionTypes.Login;
  constructor(public payload: AuthCredentials) {}
}

export class LoginSuccessAction implements Action {
  readonly type = AppActionTypes.LoginSuccess;
  constructor(public payload: User) {}
}

export class LoginErrorAction implements Action {
  readonly type = AppActionTypes.LoginError;
  constructor(public payload: Errors) {}
}

export class ExistingUserSuccessAction implements Action {
  readonly type = AppActionTypes.ExistingUserSuccess;
  constructor(public payload: User) {}
}

export type AppAction = LoadApp | AppLoaded | AppLoadError |
  LoginAction | LoginSuccessAction | LoginErrorAction | ExistingUserSuccessAction;

export const fromAppActions = {
  LoadApp,
  AppLoaded,
  AppLoadError
};
