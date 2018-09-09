import { UserService } from './../../core/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../core/models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
    this.userSubscription = this.userService.currentUser.subscribe(newUser => {
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
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
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
