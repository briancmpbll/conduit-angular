import { AuthGuard } from './../core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { EditableArticleResolverGuard } from './editable-article-resolver.guard';
import { EditorComponent } from './editor/editor.component';

const editorRouting = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolverGuard
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule
  ],
  declarations: [EditorComponent],
  providers: [EditableArticleResolverGuard]
})
export class EditorModule { }
