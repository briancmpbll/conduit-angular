import { HttpClient } from '@angular/common/http';
import { Article } from './../models/article.model';
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
}
