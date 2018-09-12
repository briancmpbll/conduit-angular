import { Errors } from '../../core/models/errors.model';
import { AuthCredentials, User } from '../../core/models/user.model';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginError = '[Auth] Login Error',
  ExistingUserSuccess = '[Auth] Existing User Success',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: AuthCredentials) { }
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: User) { }
}

export class LoginErrorAction implements Action {
  readonly type = AuthActionTypes.LoginError;
  constructor(public payload: Errors) { }
}

export class ExistingUserSuccessAction implements Action {
  readonly type = AuthActionTypes.ExistingUserSuccess;
  constructor(public payload: User) { }
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccessAction implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
}

export type AuthAction = LoginAction | LoginSuccessAction | LoginErrorAction |
  ExistingUserSuccessAction | LogoutAction | LogoutSuccessAction;
