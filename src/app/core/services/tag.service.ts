import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<string[]> {
    return this.http.get<{tags: string[]}>('/tags')
    .pipe(
      map(data => data.tags)
    );
  }
}
