import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/f',
    pathMatch: 'full'
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'marcas',
    loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule)
  },
  {
    path: 'estoque',
    loadChildren: () => import('./pages/stock/stock.module').then(m => m.StockModule)
  },
  {
    path: 'f',
    loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalog/catalog-list/catalog-list.component').then(m => m.CatalogListComponent),
  },
  {
    path: 'catalogo/detalhe/:id',
    loadComponent: () => import('./pages/catalog/catalog-detail/catalog-detail.component').then(m => m.CatalogDetailComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
