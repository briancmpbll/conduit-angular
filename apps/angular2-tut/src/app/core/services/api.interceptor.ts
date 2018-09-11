import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Errors } from '../models/errors.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JwtService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${environment.api_url}${request.url}`,
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const token = this.jwtService.getToken();
    if (token !== null) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Token ${token}`
        }
      });
    }

    return next.handle(request).pipe(catchError(err => {
      return throwError(err.error);
    }));
  }
}
