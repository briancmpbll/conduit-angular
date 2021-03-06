import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppState } from '../../+state/app.reducer';
import { LogoutAction } from '../../auth/+state/auth.actions';
import { authQuery } from '../../auth/+state/auth.selectors';
import { User } from './../../core/models/user.model';
import { UserService } from './../../core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: User = new User();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  private userSubscription?: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    this.userSubscription = this.store.select(authQuery.getCurrentUser).subscribe(newUser => {
      this.user = newUser;
      this.settingsForm.patchValue(this.user);
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.store.dispatch(new LogoutAction);
  }

  submitForm() {
    this.isSubmitting = true;

    this.userService.update(this.settingsForm.value)
    .pipe(
      finalize(() => this.isSubmitting = false)
    )
    .subscribe(updatedUser => {
      this.router.navigateByUrl(`/profile/${updatedUser.username}`);
    }, err => {
      this.errors = err;
    });
  }

}
