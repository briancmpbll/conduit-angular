import { RouterModule } from '@angular/router';
import { ProfileResolverGuard } from './profile-resolver.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';

const profileRouting = RouterModule.forChild([
  {
    path: 'profile/:username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolverGuard
    }
  }
]);

@NgModule({
  imports: [
    CommonModule,
    profileRouting
  ],
  declarations: [ProfileComponent, FollowButtonComponent],
  providers: [
    ProfileResolverGuard
  ]
})
export class ProfileModule { }
