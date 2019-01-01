import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {SignupPage} from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private alertctrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  toLog(){
    let data = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:8080/voter/login', data).subscribe(response => {
            this.navCtrl.push(HelloIonicPage);
            console.log('POST Response:', response);
        });
  
      }

  toSignup(){  //the buttton that will send the user back to sign up page
    this.navCtrl.push(SignupPage);
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
