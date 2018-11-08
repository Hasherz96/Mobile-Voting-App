import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { VotePage } from '../vote/vote';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertctrl:AlertController) {


  }

  toVote(){
    this.navCtrl.push(VotePage);
  }
  
}
