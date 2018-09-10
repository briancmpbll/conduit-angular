import { RouterModule } from '@angular/router';
import { ProfileResolverGuard } from './profile-resolver.guard';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';

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
  declarations: [ProfileComponent, ProfileArticlesComponent, ProfileFavoritesComponent],
  providers: [
    ProfileResolverGuard
  ]
})
export class ProfileModule { }
