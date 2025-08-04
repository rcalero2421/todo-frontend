/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { UserRepository } from '@modules/auth/domain/repositories';
import { Observable, map } from 'rxjs';
import { UserService } from '../services';
import { UserMapper } from '../mappers';
import { UserEntity, UserTokenEntity } from '@modules/auth/domain/entities';
import { ResponseI } from '@core/utils';
@Injectable({
  providedIn: 'root',
})
export class UserImplRepository implements UserRepository {
  private userMapper = new UserMapper();
  constructor(
    private userService: UserService
  ) {
    console.log('UserImplRepository initialized');
  }

  login(email: string): Observable<ResponseI<UserTokenEntity>> {
    return this.userService.login(email);
  }

  createUser(email: string): Observable<ResponseI<UserTokenEntity>> {
    return this.userService.createUser(email);
  }
}