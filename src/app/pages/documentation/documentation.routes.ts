import { Routes } from '@angular/router';

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./documentation.component')
      .then(c => c.DocumentationComponent),
    children: [
      {
        path: 'getting-started',
        loadComponent: () => import('./getting-started/getting-started.component')
          .then(c => c.GettingStartedComponent)
      },
    ],
  },
];
