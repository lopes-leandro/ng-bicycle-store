import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ClarityModule
  ]
})
export class CatalogModule { }
