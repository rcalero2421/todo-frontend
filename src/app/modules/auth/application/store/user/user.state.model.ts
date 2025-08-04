import { ResponseI } from '@core/utils';
import { UserEntity } from '@modules/auth/domain/entities';

export interface UserStateModel {
  user: UserEntity;
  token: string;
  response: ResponseI<UserEntity>;
}