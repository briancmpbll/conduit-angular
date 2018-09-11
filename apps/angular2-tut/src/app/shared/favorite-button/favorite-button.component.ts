import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { ArticleService } from '../../article/services/article.service';
import { Article } from './../../core/models/article.model';
import { catchError, finalize } from 'rxjs/operators';

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
    private userService: UserService
  ) { }

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe((authenticated) => {
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
    });
  }

}
