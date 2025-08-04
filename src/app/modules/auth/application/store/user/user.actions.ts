import { UserEntity } from '@modules/auth/domain/entities';

export class LoginAction {
  static readonly type = '[User] Login';

  constructor(
    public email: string,
  ) {}
}

export class GetUserAction {
  static readonly type = '[User] Get User';
  constructor(public user?: UserEntity) {}
}

export class CreateUserAction {
  static readonly type = '[User] Create User';
  constructor(public email: string) {}
}

export class GetUserTokenAction {
  static readonly type = '[User] Get User Token';
  constructor(public token: string) {}
}
export class LogoutAction {
  static readonly type = '[User] Logout';
}

export class NavigateToLoginAction {
  static readonly type = '[User] Navigate to Login';
}
