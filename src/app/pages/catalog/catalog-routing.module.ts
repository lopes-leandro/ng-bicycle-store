import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogFilterComponent } from './catalog-filter/catalog-filter.component';
import { CatalogListComponent } from './catalog-list/catalog-list.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogFilterComponent
  },
  {
    path: 'catalogo/:id',
    loadComponent: () => import('./catalog-list/catalog-list.component').then(m => m.CatalogListComponent),
  },
  {
    path: 'catalogo/:id/detalhe/:id',
    loadComponent: () => import('./catalog-detail/catalog-detail.component').then(m => m.CatalogDetailComponent),
  },
  {
    path: 'catalogo/detalhe/:id',
    loadComponent: () => import('./catalog-detail/catalog-detail.component').then(m => m.CatalogDetailComponent),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
