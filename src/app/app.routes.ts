import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('./pages/documentation/documentation.routes')
      .then(c => c.DOCS_ROUTES)
  },
  {path: '', redirectTo: 'docs', pathMatch: 'full'}
];
