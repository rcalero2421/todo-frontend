import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  setMenuStatus(visible: any): Observable<MenuModel[]> {
    return of([
      {
        visible: visible.visible,
      },
    ]);
  }
}