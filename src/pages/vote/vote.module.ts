import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VotePage } from './vote';
//import { Injectable } from '@angular/core';

// @Injectable()
// export var SingletonService {
//   public, studentVoted :boolean = false,
// }

@NgModule({
  declarations: [
    VotePage,
  ],
  imports: [
    IonicPageModule.forChild(VotePage),
  ],
})
export class VotePageModule {}

