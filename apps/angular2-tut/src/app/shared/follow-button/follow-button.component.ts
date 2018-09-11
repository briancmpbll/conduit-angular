import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first } from 'rxjs/operators';
import { ProfileService } from '../../core/services/profile.service';
import { AppState } from './../../+state/app.reducer';
import { appQuery } from './../../+state/app.selectors';
import { Profile } from './../../core/models/profile.model';

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
    private store: Store<AppState>
  ) { }

  toggleFollowing() {
    this.isSubmitting = true;

    this.store.select(appQuery.getIsAuthenticated).pipe(first())
    .subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      if (!this.profile.following) {
        this.profileService.follow(this.profile.username as string)
        .pipe(
          finalize(() => this.isSubmitting = false)
        )
        .subscribe(
          () => this.toggle.emit(true)
        );
      } else {
        this.profileService.unfollow(this.profile.username as string)
        .pipe(
          finalize(() => this.isSubmitting = false)
        )
        .subscribe(
          () => this.toggle.emit(false)
        );
      }
    });
  }
}
