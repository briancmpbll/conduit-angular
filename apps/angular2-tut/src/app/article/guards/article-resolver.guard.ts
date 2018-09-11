import { articleQuery } from './../+state/article.selectors';
import { LoadArticleAction, ArticleActionTypes } from './../+state/article.actions';
import { ArticleState } from './../+state/article.reducer';
import { UserService } from '../../core/services/user.service';
import { Article } from '../../core/models/article.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { catchError, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverGuard implements CanActivate {
  constructor(
    private store: Store<ArticleState>,
    private actions$: Actions
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> {
    this.store.dispatch(new LoadArticleAction(route.params.slug));

    return this.actions$.ofType(ArticleActionTypes.ArticleLoaded, ArticleActionTypes.ArticleLoadError).pipe(
      map(action => action.type === ArticleActionTypes.ArticleLoaded ? true : false)
    );
  }
}
