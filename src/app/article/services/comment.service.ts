import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../core/models/comment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  add(slug: string, payload: string): Observable<Comment> {
    return this.http.post<{ comment: Comment }>(`articles/${slug}/comments`, {
      comment: {
        body: payload
      }
    }).pipe(
      map(data => data.comment)
    );
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.http.get<{ comments: Comment[] }>(`/articles/${slug}/comments`).pipe(
      map(data => data.comments)
    );
  }

  destroy(commentId: number, articleSlug: string): Observable<null> {
    return this.http.delete<null>(`/articles${articleSlug}/comments/${commentId}`);
  }
}
