import { HttpClient } from '@angular/common/http';
import { Article } from '../core/models/article.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

interface ArticleResponse {
  article: Article;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  get(slug: string): Observable<Article> {
    return this.http.get<ArticleResponse>(`/articles/${slug}`).pipe(
      map(data => data.article)
    );
  }

  save(article: Article): Observable<Article> {
    if (article.slug) {
      return this.http.put<ArticleResponse>(`/articles/${article.slug}`, {article}).pipe(
        map(data => data.article)
      );
    }

    return this.http.post<ArticleResponse>('/articles/', {article}).pipe(
      map(data => data.article)
    );
  }

  destroy(slug: string): Observable<null> {
    return this.http.delete<null>(`/articles/${slug}`);
  }

  favorite(slug: string): Observable<Article> {
    return this.http.post<ArticleResponse>(`/articles/${slug}/favorite`, null).pipe(
      map(data => data.article)
    );
  }

  unfavorite(slug: string): Observable<Article> {
    return this.http.delete<ArticleResponse>(`/articles/${slug}/favorite`).pipe(
      map(data => data.article)
    );
  }
}
