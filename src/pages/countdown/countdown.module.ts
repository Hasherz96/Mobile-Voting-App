import { NgModule, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountdownPage } from './countdown';



@NgModule({
  declarations: [
    CountdownPage,
  ],
  imports: [
    IonicPageModule.forChild(CountdownPage),
  ],
})
export class CountdownPageModule {}
