import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { AppState } from '../../+state/app.reducer';
import { ArticleService } from '../../article/services/article.service';
import { appQuery } from './../../+state/app.selectors';
import { Article } from './../../core/models/article.model';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {
  @Input() article: Article = new Article;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter;
  isSubmitting = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  toggleFavorite() {
    this.isSubmitting = true;

    const subscription = this.store.select(appQuery.getIsAuthenticated).subscribe((authenticated) => {
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      if (!this.article.favorited) {
        this.articleService.favorite(this.article.slug as string)
        .pipe(
          finalize(() => this.isSubmitting = false)
        )
        .subscribe(
          () => {
            this.toggle.emit(true);
          }
        );
      } else {
        this.articleService.unfavorite(this.article.slug as string)
        .pipe(
          finalize(() => this.isSubmitting = false)
        )
        .subscribe(
          () => {
            this.toggle.emit(false);
          }
        );
      }

      subscription.unsubscribe();
    });
  }

}
