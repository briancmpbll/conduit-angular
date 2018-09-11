import { appQuery } from './../../+state/app.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AppState } from '../../+state/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$?: Observable<User>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(appQuery.getCurrentUser);
  }

}
