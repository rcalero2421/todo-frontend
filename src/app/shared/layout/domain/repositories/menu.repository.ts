import { Observable } from 'rxjs';
import { MenuEntity } from '../entities';

export abstract class MenuRepository {
  abstract getMenuStatus(visible: boolean): Observable<MenuEntity[]>;
}