import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { JwtService } from '../../core/services/jwt.service';
import { UserService } from '../../core/services/user.service';
import { AuthActionTypes, LoginAction, LoginErrorAction, LoginSuccessAction, LogoutAction, LogoutSuccessAction } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.ofType<LoginAction>(AuthActionTypes.Login).pipe(
    mergeMap(loginAction => {
      return this.userService.attemptAuth('login', loginAction.payload).pipe(
        map(user => new LoginSuccessAction(user)),
        catchError(err => of(new LoginErrorAction(err))),
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.ofType<LoginSuccessAction>(AuthActionTypes.LoginSuccess).pipe(
    tap(loginSuccessAction => {
      this.jwtService.saveToken(loginSuccessAction.payload.token as string);
      this.router.navigateByUrl('/');
    })
  );

  @Effect()
  logout$ = this.actions$.ofType<LogoutAction>(AuthActionTypes.Logout).pipe(
    tap(() => this.jwtService.destroyToken()),
    map(() => new LogoutSuccessAction)
  );

  @Effect({ dispatch: false })
  logoutSuccess$ = this.actions$.ofType<LogoutSuccessAction>(AuthActionTypes.LogoutSuccess).pipe(
    tap(() => this.router.navigateByUrl('/'))
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router
  ) {}
}
