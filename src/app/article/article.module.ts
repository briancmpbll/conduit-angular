import { AuthGuard } from '../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { EditableArticleResolverGuard } from './editable-article-resolver.guard';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleComponent } from './article/article.component';
import { ArticleResolverGuard } from './article-resolver.guard';

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
  declarations: [ArticleEditorComponent, ArticleComponent],
  providers: [EditableArticleResolverGuard, ArticleResolverGuard]
})
export class ArticleModule { }
