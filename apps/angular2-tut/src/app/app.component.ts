import { LoadApp } from './+state/app.actions';
import { Component, OnInit } from '@angular/core';
import { AppState } from './+state/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new LoadApp);
  }
}
