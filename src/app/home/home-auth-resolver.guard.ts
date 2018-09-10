import { take } from 'rxjs/operators';
import { UserService } from './../core/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolverGuard implements Resolve<boolean> {
  constructor(
    private userService: UserService
  ) {}

  resolve(
    router: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
