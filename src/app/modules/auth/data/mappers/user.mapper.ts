import { Mapper } from '@core/utils';
import { UserModel } from '../models';
import { UserEntity } from '@modules/auth/domain/entities';
import { RolesUser } from '@core/constants';

export class UserMapper implements Mapper<UserModel, UserEntity> {
    mapFrom(param: UserModel): UserEntity {
        return new UserEntity(
            param.id,
            param.email,
            param.name,
            param.role
        );
    }

    mapTo(param: UserEntity): UserModel {
        return {
            id: param.id,
            email: param.email,
            name: param.name,
            role: param.role || RolesUser.user,
        };
    }
}