import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    StockListComponent,
    StockFormComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    ClarityModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [CurrencyPipe,provideNgxMask()]
})
export class StockModule { }
