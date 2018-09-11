import { ArticleListConfig } from './../../core/models/article-list-config.model';
import { ArticleService } from './../../article/services/article.service';
import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../core/models/article.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  @Input() limit?: number;

  query: ArticleListConfig = new ArticleListConfig;
  results: Article[] = [];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  constructor(
    private articleService: ArticleService
  ) { }

  @Input() set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    if (this.limit !== undefined) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.articleService.query(this.query)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe(data => {
      this.results = data.articles;

      this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / (this.limit || 1))), (val, index) => index + 1);
    });
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

}
