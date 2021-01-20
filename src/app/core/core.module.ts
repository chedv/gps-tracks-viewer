import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { DevicesComponent } from './devices/devices.component';

@NgModule({
  declarations: [
    DevicesComponent
  ],
  exports: [
    DevicesComponent
  ],
  imports: [
    BrowserModule
  ]
})
export class CoreModule { }
