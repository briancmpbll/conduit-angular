import { ProfileResolverGuard } from './profile-resolver.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ProfileResolverGuard
  ]
})
export class ProfileModule { }
