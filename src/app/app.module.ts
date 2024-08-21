import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';

import '@cds/core/icon/register'
import { ClarityIcons, userIcon, bicycleIcon, homeIcon, detailsIcon } from '@cds/core/icon';
import { HeaderComponent } from './shared/components/header/header.component';

const icons = [
  userIcon,
  bicycleIcon,
  homeIcon,
  detailsIcon
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
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(...icons)
  }
 }
