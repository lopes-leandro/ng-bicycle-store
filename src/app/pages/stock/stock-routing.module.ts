import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockFormComponent } from './stock-form/stock-form.component';

const routes: Routes = [
  {
    path: '',
    component: StockListComponent
  },
  {
    path: 'criar',
    component: StockFormComponent
  },
  {
    path: 'editar/:id',
    component: StockFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
