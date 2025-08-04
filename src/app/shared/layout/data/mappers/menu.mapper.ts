import { Mapper } from '@core/utils';
import { MenuModel } from '../models';
import { MenuEntity } from '@shared/layout/domain/entities';

export class MenuMapper implements Mapper<MenuModel, MenuEntity> {
  mapFrom(param: MenuModel): MenuEntity {
    return new MenuEntity(param.visible);
  }

  mapTo(param: MenuEntity): MenuModel {
    return {
      visible: param.visible,
    };
  }
}