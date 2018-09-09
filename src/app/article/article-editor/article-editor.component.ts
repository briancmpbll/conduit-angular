import { Component, OnInit } from '@angular/core';
import { Article } from '../../core/models/article.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  article: Article = new Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
      }
    });
  }

  addTag() {
    const tag = this.tagField.value;
    if (!this.article.tagList.includes(tag)) {
      this.article.tagList.push(tag);
    }

    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    this.articleService.save({
      slug: this.article.slug,
      ...this.articleForm.value,
      tagList: this.article.tagList
    })
    .pipe(
      finalize(() => this.isSubmitting = false)
    )
    .subscribe(
      article => this.router.navigateByUrl(`/editor/${article.slug}`),
      err => {
        this.errors = err;
      }
    );
  }

}
