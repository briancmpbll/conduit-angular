import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../+state/app.reducer';
import { LoginAction } from '../+state/auth.actions';
import { authQuery } from '../+state/auth.selectors';
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
  authForm: FormGroup;
  errors$?: Observable<Errors | undefined>;
  loginSubmitting$?: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
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

    this.errors$ = this.store.select(authQuery.getLoginErrors);
    this.loginSubmitting$ = this.store.select(authQuery.getLoginSubmitting);
  }

  submitForm() {
    const credentials: AuthCredentials = this.authForm.value;

    if (this.authType === 'login') {
      this.store.dispatch(new LoginAction(credentials));
    }
  }
}
