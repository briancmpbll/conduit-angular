import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../+state/app.reducer';
import { appQuery } from '../../+state/app.selectors';
import { Comment } from '../../core/models/comment.model';
import { User } from './../../core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  @Input() comment: Comment = new Comment;
  @Output() deleteComment: EventEmitter<boolean> = new EventEmitter;

  canModify = false;

  private userSubscription?: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.userSubscription = this.store.select(appQuery.getCurrentUser).subscribe((userData: User) => {
      this.canModify = userData.username === this.comment.author.username;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

}
