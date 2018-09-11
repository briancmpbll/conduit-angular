import { appQuery } from './../../+state/app.selectors';
import { UserService } from '../../core/services/user.service';
import { Article } from '../../core/models/article.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { map, catchError, first, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../+state/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class EditableArticleResolverGuard implements Resolve<Article | null> {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Article | null> {
    return this.articleService.get(route.params.slug).pipe(
      mergeMap(article => {
        return this.store.select(appQuery.getCurrentUser).pipe(
          first(),
          map(user => {
            if (user.username === article.author.username) {
              return article;
            } else {
              this.router.navigateByUrl('/');
              return null;
            }
          })
        );
      }),
      catchError(() => {
        this.router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}
