import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { VotePage } from '../vote/vote';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private alertctrl:AlertController,
     public global: GlobalVarProvider) {


  }

  toVote(){
      if(this.global.studentVoted==true){  //if already voted cannot give access
        
        this.createAlert();
      
      }
      else{ //give access to vote
        this.navCtrl.push(VotePage);
      }
  }

  createAlert(){
    let alert = this.alertctrl.create({
      title:'Oops!',
      message:'You have already cast your vote',
  
      buttons: [
        {
          text: 'Okay',
          role: 'Stay in page',
          handler: () => {
            console.log('Stay in Page');
          }
        }
      ]
    });
    alert.present();

  }

  
}
