import { Injectable } from '@angular/core';
import { MenuRepository } from '@shared/layout/domain/repositories';
import { Observable, map } from 'rxjs';
import { MenuService } from '../services';
import { MenuMapper } from '../mappers';
import { MenuEntity } from '@shared/layout/domain/entities';
@Injectable({
  providedIn: 'root',
})
export class MenuImplRepository implements MenuRepository {
  private menuMapper = new MenuMapper();
  constructor(private menuService: MenuService) {}

  getMenuStatus(visible: boolean): Observable<MenuEntity[]> {
    return this.menuService
      .setMenuStatus(visible)
      .pipe(map(menu => menu.map(this.menuMapper.mapFrom)));
  }
}