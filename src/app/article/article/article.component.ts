import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from './../../core/models/article.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article = new Article;
  currentUser: User = new User;
  canModify = false;
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.article = data.article;
      this.updateCanModify();
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.updateCanModify();
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articleService.destroy(this.article.slug)
    .pipe(
      finalize(() => this.isDeleting = false)
    )
    .subscribe(success => this.router.navigateByUrl('/'));
  }

  private updateCanModify() {
    this.canModify = this.currentUser.username === this.article.author.username;
  }

}
