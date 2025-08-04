/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { UserState } from '@modules/auth/application/store/user';
import { Select } from '@ngxs/store';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  @Select(UserState.getToken)
  userToken$!: Observable<string>;
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userToken$.pipe(
      map(token => {
        if (!token) {
          return true;
        } else {
          this.router.navigate(['/dashboard']);
          return false;
        }
      })
    );
  }
}