import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Errors } from '../../core/models/errors.model';
import { AuthCredentials } from '../../core/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const url = this.route.snapshot.url;
    this.authType = url[url.length - 1].path;
    this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl('', Validators.required));
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials: AuthCredentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
