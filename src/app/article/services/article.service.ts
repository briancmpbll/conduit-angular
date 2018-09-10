import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../../core/models/article.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ArticleListConfig, ArticleListFilters } from '../../core/models/article-list-config.model';

interface ArticleResponse {
  article: Article;
}

interface ArticleQueryResponse {
  articles: Article[];
  articlesCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  query(config: ArticleListConfig): Observable<ArticleQueryResponse> {
    const params: HttpParams = new HttpParams;

    for (const key in config.filters) {
      if (config.filters.hasOwnProperty(key)) {
        params.set(key, config.filters[key as (keyof ArticleListFilters)] as string);
      }
    }

    return this.http.get<ArticleQueryResponse>(`/articles${config.type === 'feed' ? 'feed' : ''}`, {
      params
    });
  }

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
