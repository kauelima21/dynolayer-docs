import { Routes } from '@angular/router';

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./documentation.component').then((c) => c.DocumentationComponent),
    children: [
      {
        path: 'getting-started',
        title: 'Comece a usar',
        loadComponent: () =>
          import('./getting-started/getting-started.component').then(
            (c) => c.GettingStartedComponent,
          ),
      },
      {
        path: 'query-builder',
        title: 'Query Builder',
        loadComponent: () =>
          import('./query-builder/query-builder.component').then(
            (c) => c.QueryBuilderComponent,
          ),
      },
      {
        path: 'collections',
        title: 'Collections',
        loadComponent: () =>
          import('./collections/collections.component').then(
            (c) => c.CollectionsComponent,
          ),
      },
      {
        path: 'advanced',
        title: 'Advanced',
        loadComponent: () =>
          import('./advanced/advanced.component').then((c) => c.AdvancedComponent),
      },
      { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
    ],
  },
];
