import { ArticleService } from '../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from './../../core/models/article.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { finalize } from 'rxjs/operators';
import { Comment } from '../../core/models/comment.model';
import { FormControl } from '@angular/forms';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article = new Article;
  currentUser: User = new User;
  canModify = false;
  comments: Comment[] = [];
  commentControl = new FormControl;
  commentFormErrors: Object = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.article = data.article;
      this.updateCanModify();
      this.populateComments();
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

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = [];

    const commentBody = this.commentControl.value;
    this.commentService.add(this.article.slug, commentBody)
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
    this.commentService.destroy(comment.id, this.article.slug)
    .subscribe(() => this.comments = this.comments.filter((item) => item.id !== comment.id));
  }

  private updateCanModify() {
    this.canModify = this.currentUser.username === this.article.author.username;
  }

  private populateComments() {
    this.commentService.getAll(this.article.slug)
    .subscribe(comments => this.comments = comments);
  }

}
