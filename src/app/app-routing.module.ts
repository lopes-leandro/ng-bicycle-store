import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/categorias',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
