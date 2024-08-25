import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BrandListComponent,
    BrandFormComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
  ]
})
export class BrandsModule { }
