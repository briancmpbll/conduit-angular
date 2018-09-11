import { appQuery } from './../../+state/app.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors } from '../../core/models/errors.model';
import { AuthCredentials } from '../../core/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../+state/app.reducer';
import { LoginAction } from '../../+state/app.actions';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authType = '';
  title = '';
  authForm: FormGroup;
  errors$?: Observable<Errors | undefined>;
  loginSubmitting$?: Observable<boolean>;

  private userSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

    this.userSubscription = this.store.select(appQuery.getCurrentUser).subscribe((user) => {
      if (user.username) {
        this.router.navigateByUrl('/');
      }
    });
    this.errors$ = this.store.select(appQuery.getLoginErrors);
    this.loginSubmitting$ = this.store.select(appQuery.getLoginSubmitting);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  submitForm() {
    const credentials: AuthCredentials = this.authForm.value;

    if (this.authType === 'login') {
      this.store.dispatch(new LoginAction(credentials));
    }
  }
}
