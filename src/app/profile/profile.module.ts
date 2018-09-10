import { RouterModule } from '@angular/router';
import { ProfileResolverGuard } from './profile-resolver.guard';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';

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
    SharedModule,
    profileRouting
  ],
  declarations: [ProfileComponent, ProfileArticlesComponent],
  providers: [
    ProfileResolverGuard
  ]
})
export class ProfileModule { }
