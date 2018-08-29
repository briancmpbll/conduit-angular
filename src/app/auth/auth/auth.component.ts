import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
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

    const credentials = this.authForm.value;
    console.log(credentials);
  }
}
