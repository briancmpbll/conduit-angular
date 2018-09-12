import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../+state/app.reducer';
import { authQuery } from '../../auth/+state/auth.selectors';
import { Article } from '../../core/models/article.model';
import { ArticleService } from '../services/article.service';

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
        return this.store.select(authQuery.getCurrentUser).pipe(
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
