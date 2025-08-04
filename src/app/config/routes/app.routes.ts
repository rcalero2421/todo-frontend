/* eslint-disable max-len */
import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from '@core/guards';
import { LayoutComponent } from '@shared/layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('@modules/auth/presentation/pages/auth/auth-page.component'),
    data: { title: 'Log In' },
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import(
            '@modules/home/presentation/pages/home/home-page.component'
          ),
        data: { title: 'Home' },
      },
      {
        path: 'task',
        loadComponent: () =>
          import(
            '@modules/task/presentation/pages/task/task-page.component'
          ),
        data: { title: 'Tasks' },
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];