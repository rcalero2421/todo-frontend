import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'task',
    loadChildren: () => import('./modules/home/routes').then(m => m.TASK_ROUTES),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
