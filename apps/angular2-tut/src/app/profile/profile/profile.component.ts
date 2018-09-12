import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../+state/app.reducer';
import { authQuery } from '../../auth/+state/auth.selectors';
import { Profile } from './../../core/models/profile.model';
import { User } from './../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile = new Profile;
  currentUser: User = new User;
  isUser = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.profile = data.profile;
      this.checkIsUser();
    });

    this.store.select(authQuery.getCurrentUser).subscribe(userData => {
      this.currentUser = userData;
      this.checkIsUser();
    });
  }

  onToggleFollowing(following: boolean) {
    if (this.profile !== undefined) {
      this.profile.following = following;
    }
  }

  private checkIsUser() {
    if (this.currentUser === undefined || this.profile === undefined) {
      this.isUser = false;
    } else {
      this.isUser = this.currentUser.username === this.profile.username;
    }
  }

}
