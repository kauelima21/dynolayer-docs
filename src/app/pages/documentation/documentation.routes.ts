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
      {
        path: 'persisting-data',
        loadComponent: () => import('./persisting-data/persisting-data.component')
          .then(c => c.PersistingDataComponent)
      },
      {
        path: 'retrieving-data',
        loadComponent: () => import('./retrieving-data/retrieving-data.component')
          .then(c => c.RetrievingDataComponent)
      },
      {
        path: 'removing-data',
        loadComponent: () => import('./removing-data/removing-data.component')
          .then(c => c.RemovingDataComponent)
      },
      { path: '', redirectTo: 'getting-started', pathMatch: 'full' }
    ],
  },
];
