import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';

import '@cds/core/icon/register'
import { ClarityIcons, userIcon, bicycleIcon, homeIcon, detailsIcon, boltIcon, certificateIcon, storeIcon, factoryIcon, shoppingBagIcon } from '@cds/core/icon';
import { HeaderComponent } from './shared/components/header/header.component';
import { VerticalNavComponent } from './shared/components/vertical-nav/vertical-nav.component';

const icons = [
  userIcon,
  bicycleIcon,
  homeIcon,
  detailsIcon,
  boltIcon,
  certificateIcon,
  storeIcon, factoryIcon, shoppingBagIcon
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(...icons)
  }
 }
