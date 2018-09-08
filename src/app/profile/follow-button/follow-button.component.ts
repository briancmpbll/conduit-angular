import { Profile } from './../../core/models/profile.model';
import { UserService } from './../../core/services/user.service';
import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent {
  @Input() profile: Profile = new Profile();
  @Output() toggle: EventEmitter<boolean> = new EventEmitter;
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService
  ) { }

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      if (!this.profile.following) {
        this.profileService.follow(this.profile.username as string).subscribe(
          () => {
            this.isSubmitting = false;
            this.toggle.emit(true);
          },
          err => this.isSubmitting = false
        );
      } else {
        this.profileService.unfollow(this.profile.username as string).subscribe(
          () => {
            this.isSubmitting = false;
            this.toggle.emit(false);
          },
          err => this.isSubmitting = false
        );
      }
    });
  }
}
