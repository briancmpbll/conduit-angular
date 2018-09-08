import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  get(username: string): Observable<Profile> {
    return this.http.get<{profile: Profile}>(`/profiles/${username}`)
    .pipe(map(data => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.http.post<Profile>(`/profiles/${username}/follow`, null);
  }

  unfollow(username: string): Observable<Profile> {
    return this.http.delete<Profile>(`/profiles/${username}/follow`);
  }
}
