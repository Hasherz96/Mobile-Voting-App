import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email: string;
  password: string;
  confirm_password: string

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertctrl:AlertController,private http: HttpClient) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  toHome(){ //to link the page to home
    let data = {
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password
    };
        
    this.http.post('http://localhost:8080/voter/signup', data).subscribe(response => {
            this.navCtrl.push(HelloIonicPage);
            console.log('POST Response:', response);
        });
  }

  toLogin(){
    this.navCtrl.push(LoginPage);
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
