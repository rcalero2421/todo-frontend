/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserEntity } from '@modules/auth/domain/entities';
import { LogoutAction, UserState } from '@modules/auth/application/store/user';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  user$: Observable<UserEntity | null>;
  constructor(
    private router: Router,
    private store: Store
  ) {
    this.user$ = this.store.select(UserState.getUser);
  }

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const token = this.store.selectSnapshot(UserState.getToken);
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.handleUnauthorized();
        } else {
          this.handleError(error);
        }
        return throwError(error);
      })
    );
  }

  private handleUnauthorized(): void {
    this.store.dispatch(new LogoutAction());
    this.router.navigate(['/auth/login']);
  }

  private handleError<T>(_error: T): void {
    // TODO: Implement error handling using _error
    console.error('An error occurred:', _error);
  }
}