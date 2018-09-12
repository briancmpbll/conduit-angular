import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { AppActionTypes, AppLoaded, AppLoadError, LoadApp } from './app.actions';
import { AppState } from './app.reducer';
import { ExistingUserSuccessAction } from '../auth/+state/auth.actions';


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
  appLoaded$ = this.actions$.ofType<AppLoaded>(AppActionTypes.AppLoaded).pipe(
    mergeMap(() => {
      return this.userService.getLoggedInUser().pipe(
        map(user => new ExistingUserSuccessAction(user)),
        catchError(() => of({type: 'NO_ACTION'}))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<AppState>,
    private userService: UserService
  ) {}
}
