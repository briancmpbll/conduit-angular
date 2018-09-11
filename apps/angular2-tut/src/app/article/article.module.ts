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
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initialState as articleInitialState, articleReducer } from './+state/article.reducer';
import { ArticleEffects } from './+state/article.effects';

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
    canActivate: [ArticleResolverGuard]
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule,
    StoreModule.forFeature('article', articleReducer, { initialState: articleInitialState }),
    EffectsModule.forFeature([ArticleEffects])
  ],
  declarations: [
    ArticleEditorComponent,
    ArticleComponent,
    MarkdownPipe,
    ArticleCommentComponent
  ],
  providers: [
    EditableArticleResolverGuard,
    ArticleResolverGuard,
    ArticleService
  ]
})
export class ArticleModule {}
