import { User } from './../../core/models/user.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Comment } from '../../core/models/comment.model';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment: Comment = new Comment;
  @Output() deleteComment: EventEmitter<boolean> = new EventEmitter;

  canModify = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((userData: User) => {
      this.canModify = userData.username === this.comment.author.username;
    });
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

}
