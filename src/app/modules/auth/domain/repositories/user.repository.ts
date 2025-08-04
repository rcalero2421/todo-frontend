import { Observable } from 'rxjs';
import { UserEntity, UserTokenEntity } from '../entities';
import { ResponseI } from '@core/utils';

export abstract class UserRepository {
  abstract login(email: string): Observable<ResponseI<UserTokenEntity>>;
  abstract createUser(email: string): Observable<ResponseI<UserTokenEntity>>;
}
