import { FollowButtonComponent } from './follow-button/follow-button.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsListComponent } from './errors-list/errors-list.component';
import { IfAuthedDirective } from './if-authed/if-authed.directive';

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
    FollowButtonComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ErrorsListComponent,
    IfAuthedDirective,
    FollowButtonComponent
  ]
})
export class SharedModule {}
