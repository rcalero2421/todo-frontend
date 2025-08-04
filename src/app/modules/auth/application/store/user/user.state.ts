import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user.state.model';
import { Injectable } from '@angular/core';
import {
  GetUserAction,
  LogoutAction,
  LoginAction,
  NavigateToLoginAction,
  GetUserTokenAction,
  CreateUserAction,
} from './user.actions';
import { UserRepository } from '@modules/auth/domain/repositories';
import { HttpError, ResponseI } from '@core/utils';
import { UserEntity, UserTokenEntity } from '@modules/auth/domain/entities';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserMapper } from '@modules/auth/data/mappers';
import { AlertService } from '@core/services';

@State<UserStateModel>({
  name: 'userState',
  defaults: {
    user: {} as UserEntity,
    token: '' as string,
    response: {} as ResponseI<UserEntity>,
  },
})
@Injectable()
export class UserState {
  private userMapper = new UserMapper();

  constructor(
    private userRepository: UserRepository,
    private router: Router,
    private alertService: AlertService
  ) { }

  @Selector() static getUser(state: UserStateModel): UserEntity {
    return state.user;
  }

  @Selector() static getToken(state: UserStateModel): string {
    return state.token;
  }

  @Action(LoginAction)
  login(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { email }: LoginAction
  ) {
    return this.userRepository.login(email).pipe(
      switchMap((response: ResponseI<UserTokenEntity>) => {
        const { user, token } = response.data;
        const userModel: UserEntity = this.userMapper.mapFrom(user);
        patchState({ user: userModel, token });
        dispatch(new GetUserTokenAction(token));
        return of(response);
      }),
      catchError((error: HttpError) => {
        dispatch(new GetUserAction());
        return throwError(() => error);
      })
    );
  }

  @Action(CreateUserAction)
  createUser(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { email }: CreateUserAction
  ) {
    return this.userRepository.createUser(email).pipe(
      switchMap((response: ResponseI<UserTokenEntity>) => {
        const { user, token } = response.data;
        const userModel: UserEntity = this.userMapper.mapFrom(user);
        patchState({ user: userModel, token });
        dispatch(new GetUserTokenAction(token));
        return of(response);
      }),
      catchError((error: HttpError) => {
        this.alertService.showError('Failed to create user');
        return of(error);
      })
    );
  }

  @Selector()
  static getResponse(state: UserStateModel): ResponseI<UserEntity> {
    return state.response as ResponseI<UserEntity>;
  }

  @Action(LogoutAction)
  logout({ patchState, dispatch }: StateContext<UserStateModel>) {
    patchState({ user: undefined, token: undefined });
    dispatch(new NavigateToLoginAction());
  }

  @Action(NavigateToLoginAction)
  navigateToLogin() {
    this.router.navigate(['/auth/login']);
    this.alertService.showSuccess('Close session');
  }
}