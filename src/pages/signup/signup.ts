import { Component } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import { LoginPage } from '../login/login';

import { CountdownPage } from '../countdown/countdown';

import { Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  userName: String;
  registrationnumber: String;
  email: string;
  phonenumber: String;
  password: string;
  cpassword: string

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams,private alertctrl:AlertController,private http: HttpClient) {
  
  }
  exitApp(){
    this.platform.exitApp();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  toHome(){ //to link the page to home
    let data = {
      userName: this.userName,
      registrationnumber: this.registrationnumber,
      email: this.email,
      phonenumber: this.phonenumber,
      password: this.password,
      cpassword: this.cpassword
    };
    console.log(this.userName);   
    this.http.post('http://localhost:8080/voter/signup', data).subscribe(response => {
            let alert = this.alertctrl.create({
              message:'Successfully Signup',
              buttons: [
                {
                  text: 'Next',
                  role:'Stay',
                  handler: data => {
                    this.navCtrl.push(HelloIonicPage);
                    console.log('Homepage');
                  }
                }
              ]
            });
            alert.present();
            // this.navCtrl.push(HelloIonicPage);
            // console.log('POST Response:', response);
        },error=>{
          if (error instanceof HttpErrorResponse) {

            if(error.status==404){ //invalid email entered
              let alert = this.alertctrl.create({
                title:'Attention!',
                message:'You are not allowed user.',
                buttons: [
                  {
                    text: 'Ok',
                    role:'Stay',
                    handler: () => {
                      console.log('Stay clicked');
                    }
                  }
                ]
              });
              alert.present()
            
            }else if(error.status==422){
              let alert = this.alertctrl.create({
                title:'Try Again!',
                message:'You are already signup',
                buttons: [
                  {
                    text: 'Signup',
                    role:'Stay',
                    handler: () => {
                      console.log('Stay here');
                    }
                  },  
                  {
                    text: 'Login',
                    handler: data => {
                      this.navCtrl.push(LoginPage);
                      console.log('go to signup');
                    }
                  }
                ]
              });
              alert.present();
            }else{
              let alert = this.alertctrl.create({
                // title:'Try Again!',
                message:'Invalid Signup!',
                buttons: [
                  {
                    text: 'Signup',
                    role:'Stay',
                    handler: () => {
                      console.log('staying');
                    }
                  },  
                  {
                    text: 'Login',
                    handler: data => {
                      this.navCtrl.push(LoginPage);
                      console.log('go to login');
                    }
                  }
                ]
              });
              alert.present();
            }
          }
        });  
  }

  toLogin(){
    this.navCtrl.push(LoginPage);
  }

  toCountdown(){
    this.navCtrl.push(CountdownPage);
  }

  toBack(){ //to exit app
    //creating an alert before exiting app
    let alert = this.alertctrl.create({
      title:'Confirm exit',
      message:'You are about to exit the application.Confirm ?',

      buttons: [
        {
          text: 'Confirm',
          role: ' exitApp()',
          handler: () => {
            this.exitApp();
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
