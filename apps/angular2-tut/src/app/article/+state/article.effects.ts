import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { ArticleState } from './article.reducer';
import {
  LoadArticleAction,
  ArticleLoadedAction,
  ArticleLoadErrorAction,
  ArticleActionTypes
} from './article.actions';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { filter, tap, mergeMap, map } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ArticleEffects {
  // @Effect({dispatch: false})
  // routerNavigation$ = this.actions$.ofType<Router>().pipe(
  //   filter(action => action.payload.event.url.startsWith('/article/')),
  //   map(action => {
  //     this.activatedRoute.snapshot.params
  //   })
  // );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}
}
