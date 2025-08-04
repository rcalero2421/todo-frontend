/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, Subscription, interval, map, startWith } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MenuEntity } from '../domain/entities';
import {
  GetMenuAction,
  MenuStatusState,
} from '../application/store/menu-state';
import { UserEntity } from '@modules/auth/domain/entities';
import { GetUserAction, LogoutAction, UserState } from '@modules/auth/application/store/user';

const COMPONENTS = [
  ToolbarModule,
  CalendarModule,
  ChipModule,
  BadgeModule,
  MenubarModule,
  SplitButtonModule,
  ButtonModule,
  CommonModule,
  FormsModule,
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [COMPONENTS],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public items: MenuItem[] = [
    {
      label: 'Logout',
      command: () => {
        this.logout();
      },
      visible: true,
      icon: 'pi pi-sign-out',
    },
  ];

  public menuSelected = '';
  user$: Observable<UserEntity | null>;
  date$: Observable<string> = new Observable<string>();
  menuVisible$: Observable<MenuEntity[] | null> = new Observable<
    MenuEntity[] | null
  >();
  private refreshSubscription!: Subscription;

  constructor(
    private store: Store,
  ) {
    this.user$ = this.store.select(UserState.getUser);
    this.menuVisible$ = this.store.select(MenuStatusState.getMenuStatus);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUserAction());

    this.date$ = interval(1000).pipe(
      startWith(0),
      map(() => new Date().toLocaleString())
    );


    this.refreshSubscription = interval(5000).subscribe(() => {
      this.store.dispatch(new GetUserAction());
    });
  }

  clickButton() {}

  toggleMenu() {
    this.store.dispatch(new GetMenuAction(true));
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(new LogoutAction());
  }
}