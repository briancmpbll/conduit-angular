import { ProfileService } from './../core/services/profile.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Profile } from '../core/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverGuard implements Resolve<Profile | null> {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Profile | null> {
    return this.profileService.get(route.params.username)
    .pipe(catchError(() => {
      this.router.navigateByUrl('/');
      return of(null);
    }));
  }
}
