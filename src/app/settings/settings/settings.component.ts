import { UserService } from './../../core/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User = new User();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

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
    Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user)
    .subscribe(updatedUser => {
      this.router.navigateByUrl(`/profile/${updatedUser.username}`);
    }, err => {
      this.errors = err;
      this.isSubmitting = false;
    });
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
