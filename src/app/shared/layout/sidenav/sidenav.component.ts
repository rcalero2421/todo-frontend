import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, Routes } from '@angular/router';
import { Observable, Subject, filter, of, switchMap, takeUntil } from 'rxjs';
import { MenuEntity } from '../domain/entities';
import { Store } from '@ngxs/store';
import {
  GetMenuAction,
  MenuStatusState,
} from '../application/store/menu-state';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { UserEntity } from '@modules/auth/domain/entities';
import { GetUserAction, UserState } from '@modules/auth/application/store/user';

export interface ChildrenI {
  path?: string;
  data?: { title?: string; roles?: string[] };
}

export interface RouteI {
  path?: string;
  children?: ChildrenI[];
}

const MODULES = [
  ToolbarModule,
  CalendarModule,
  ChipModule,
  BadgeModule,
  MenubarModule,
  ButtonModule,
  SidebarModule,
  CommonModule,
  SplitButtonModule,
];

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MODULES],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit, OnDestroy {
  menuVisible$: Observable<MenuEntity[] | null> = new Observable<
    MenuEntity[] | null
  >();
  sidebarVisible = false;
  menuOptionsTemp$: Observable<ChildrenI[]> = of([]);
  menuOptions$: Observable<ChildrenI[]> = of([]);
  public items: MenuItem[] = [
    {
      label: 'Salir',
      routerLink: ['/auth/login'],
      visible: true,
    },
  ];

  private destroy$: Subject<void> = new Subject<void>();
  user$: Observable<UserEntity | null>;

  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
        switchMap(() => {
          const routes: Routes = this.router.config;
          const customRoutes: RouteI[] = routes.map(route => ({
            path: route.path,
            component: route.component,
            children: route.children?.map(child => ({
              path: child.path,
              component: child.component,
              data: child.data,
            })),
          }));
          return of(customRoutes.flatMap(route => route.children ?? []));
        })
      )
      .subscribe((options: ChildrenI[]) => {
        this.menuOptions$ = of(options);
      });
    this.user$ = this.store.select(UserState.getUser);
    this.menuVisible$ = this.store.select(MenuStatusState.getMenuStatus);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUserAction());
    this.menuVisible$.subscribe(async menu => {
      if (menu !== null) {
        this.sidebarVisible = menu[0].visible;
      }
    });

    this.user$.subscribe(user => {
      this.menuOptionsTemp$ = this.menuOptions$;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar() {
    this.sidebarVisible = false;
    this.store.dispatch(new GetMenuAction(false));
  }

  clickButton() {}
}