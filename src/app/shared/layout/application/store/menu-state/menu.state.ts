import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MenuStateModel } from './menu.state.model';
import { Injectable } from '@angular/core';
import { MenuRepository } from '@shared/layout/domain/repositories';
import { GetMenuAction } from './menu.actions';
import { tap } from 'rxjs';

@State<MenuStateModel>({
  name: 'menuState',
  defaults: {
    menu: [
      {
        visible: false,
      },
    ],
  },
})
@Injectable()
export class MenuStatusState {
  @Selector()
  static getMenuStatus(state: MenuStateModel) {
    return state.menu;
  }

  constructor(private MenuRepository: MenuRepository) {}

  @Action(GetMenuAction)
  getMenuStatus(
    { patchState }: StateContext<MenuStateModel>,
    visible: boolean
  ) {
    return this.MenuRepository.getMenuStatus(visible).pipe(
      tap(menu => patchState({ menu }))
    );
  }
}