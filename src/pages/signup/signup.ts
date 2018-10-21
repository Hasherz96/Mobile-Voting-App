import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertctrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  toHome(){ //to link the page to home
    this.navCtrl.push(HelloIonicPage);
  }

  toBack(){ //to exit app
    //creating an alert before exiting app
    let alert = this.alertctrl.create({
      title:'Confirm exit',
      message:'You are about to exit the application.Confirm ?',

      buttons: [
        {
          text: 'Confirm',
          role: 'COnfirm',
          handler: () => {
            console.log('Confirm clicked');
          }
        },
        {
          text: 'Stay',
          role:'Stay',
          handler: () => {
            console.log('Stay clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
