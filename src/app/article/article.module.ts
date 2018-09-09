import { AuthGuard } from '../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { EditableArticleResolverGuard } from './guards/editable-article-resolver.guard';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleComponent } from './article/article.component';
import { ArticleResolverGuard } from './guards/article-resolver.guard';
import { ArticleService } from './services/article.service';
import { MarkdownPipe } from './markdown.pipe';
import { ArticleMetaComponent } from './article-meta/article-meta.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';

const editorRouting = RouterModule.forChild([
  {
    path: 'editor',
    component: ArticleEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: ArticleEditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolverGuard
    }
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolverGuard
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule
  ],
  declarations: [
    ArticleEditorComponent,
    ArticleComponent,
    MarkdownPipe,
    ArticleMetaComponent,
    ArticleCommentComponent
  ],
  providers: [
    EditableArticleResolverGuard,
    ArticleResolverGuard,
    ArticleService
  ]
})
export class ArticleModule { }
