import { FollowButtonComponent } from './follow-button/follow-button.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsListComponent } from './errors-list/errors-list.component';
import { IfAuthedDirective } from './if-authed/if-authed.directive';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { ArticleMetaComponent } from './article-meta/article-meta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ErrorsListComponent,
    IfAuthedDirective,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticleMetaComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ErrorsListComponent,
    IfAuthedDirective,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticleMetaComponent
  ]
})
export class SharedModule {}
