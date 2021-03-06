import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ClearArticleAction } from '../+state/article.actions';
import { articleQuery } from '../+state/article.selectors';
import { AppState } from '../../+state/app.reducer';
import { Comment } from '../../core/models/comment.model';
import { User } from '../../core/models/user.model';
import { ArticleService } from '../services/article.service';
import { CommentService } from '../services/comment.service';
import { authQuery } from '../../auth/+state/auth.selectors';
import { Article } from './../../core/models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: Article = new Article;
  currentUser: User = new User;
  canModify = false;
  comments: Comment[] = [];
  commentControl = new FormControl;
  commentFormErrors: Object = {};
  isSubmitting = false;
  isDeleting = false;

  private subscriptions?: Subscription;

  constructor(
    private articleService: ArticleService,
    private commentService: CommentService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscriptions = this.store.select(articleQuery.getArticle).subscribe(article => {
      this.article = article as Article;
      this.updateCanModify();
      this.populateComments();
    });

    this.subscriptions.add(this.store.select(authQuery.getCurrentUser).subscribe((userData: User) => {
      this.currentUser = userData;
      this.updateCanModify();
    }));
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }

    this.store.dispatch(new ClearArticleAction);
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

    this.articleService.destroy(this.article.slug as string)
    .pipe(
      finalize(() => this.isDeleting = false)
    )
    .subscribe(() => this.router.navigateByUrl('/'));
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = [];

    const commentBody = this.commentControl.value;
    this.commentService.add(this.article.slug as string, commentBody)
    .pipe(
      finalize(() => this.isSubmitting = false)
    )
    .subscribe(
      comment => {
        this.comments.unshift(comment);
        this.commentControl.reset('');
      },
      errors => {
        this.commentFormErrors = errors;
      }
    );
  }

  onDeleteComment(comment: Comment) {
    this.commentService.destroy(comment.id, this.article.slug as string)
    .subscribe(() => this.comments = this.comments.filter((item) => item.id !== comment.id));
  }

  private updateCanModify() {
    this.canModify = this.currentUser.username === this.article.author.username;
  }

  private populateComments() {
    this.commentService.getAll(this.article.slug as string)
    .subscribe(comments => this.comments = comments);
  }

}
