import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecretaryPage } from './secretary';

@NgModule({
  declarations: [
    SecretaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SecretaryPage),
  ],
})
export class SecretaryPageModule {}
