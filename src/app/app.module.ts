import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';

import '@cds/core/icon/register'
import {
  ClarityIcons,
  userIcon,
  bicycleIcon,
  homeIcon,
  detailsIcon,
  boltIcon,
  certificateIcon,
  storeIcon,
  factoryIcon,
  shoppingBagIcon,
  undoIcon,
  checkIcon,
  formIcon,
  plusIcon
} from '@cds/core/icon';
import { HeaderComponent } from '@components/header/header.component';
import { VerticalNavComponent } from '@components/vertical-nav/vertical-nav.component';

const icons = [
  userIcon,
  bicycleIcon,
  homeIcon,
  detailsIcon,
  boltIcon,
  certificateIcon,
  storeIcon,
  factoryIcon,
  shoppingBagIcon,
  undoIcon,
  checkIcon,
  plusIcon,
  formIcon
]

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    HeaderComponent,
    VerticalNavComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(...icons)
  }
}
