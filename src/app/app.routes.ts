import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/landing/landing.component').then((c) => c.LandingComponent),
  },
  {
    path: 'docs',
    loadChildren: () =>
      import('./pages/documentation/documentation.routes').then((c) => c.DOCS_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
