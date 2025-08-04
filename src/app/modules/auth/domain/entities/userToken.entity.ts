import { UserModel } from '@modules/auth/data/models';

export class UserTokenEntity {
  user: UserModel;
  token: string;

  constructor(user: UserModel, token: string) {
    this.user = user;
    this.token = token;
  }
}