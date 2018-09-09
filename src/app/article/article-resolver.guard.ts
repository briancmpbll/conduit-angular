import { UserService } from './../core/services/user.service';
import { Article } from './../core/models/article.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleService } from './article.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverGuard implements Resolve<Article | null> {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Article | null> {
    return this.articleService.get(route.params.slug).pipe(
      catchError(() => {
        this.router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}
