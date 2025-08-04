import { MenuEntity } from '@shared/layout/domain/entities';

export interface MenuStateModel {
  menu: MenuEntity[] | null;
}