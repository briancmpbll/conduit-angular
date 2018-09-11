import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ArticleService } from '../services/article.service';
import { LoadArticleAction, ArticleActionTypes, ArticleLoadedAction, ArticleLoadErrorAction } from './article.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) { }

  @Effect()
  loadArticle$ = this.actions$.ofType<LoadArticleAction>(ArticleActionTypes.LoadArticle).pipe(
    mergeMap(action => {
      return this.articleService.get(action.payload).pipe(
        map(article => new ArticleLoadedAction(article)),
        catchError(err => of(new ArticleLoadErrorAction(err)))
      );
    })
  );

  @Effect({dispatch: false})
  articleLoadError$ = this.actions$.ofType<ArticleLoadErrorAction>(ArticleActionTypes.ArticleLoadError).pipe(
    tap(() => this.router.navigateByUrl('/'))
  );
}
