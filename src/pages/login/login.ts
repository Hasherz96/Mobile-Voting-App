import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {SignupPage} from '../signup/signup';
import {PasswordChangePage} from '../password-change/password-change';


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
            let alert = this.alertctrl.create({
              message:'Successfully LoggedIn',
              buttons: [ 
                {
                  text: 'Next',
                  handler: data => {
                    this.navCtrl.push(HelloIonicPage);
                    console.log('POST Response:', response);
                  }
                }
              ]
            });
            alert.present();
        },error=>{
          if (error instanceof HttpErrorResponse) {

            if(error.status==401){ //invalid password entered
              let alert = this.alertctrl.create({
                title:'Incorrect password',
                message:'You have to change your password!',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.navCtrl.push(PasswordChangePage);
                    }
                  }
                ]
              });
              alert.present();
              

            }else if(error.status==404){//invalid email

              let alert = this.alertctrl.create({
                title:'Invalid email',
                message:'Please try correct email or signup!',
                buttons: [
                  {
                    text: 'Try',
                    role:'Stay',
                    handler: () => {
                      console.log('Stay here');
                    }
                  },  
                  {
                    text: 'Signup',
                    handler: data => {
                      this.navCtrl.push(SignupPage);
                      console.log('go to signup');
                    }
                  }
                ]
              });
              alert.present();
            }else{
              let alert = this.alertctrl.create({
                title:'Invalid login',
                message:'Invalid login.\nTry Again!!!',
                buttons: [
                  {
                    text: 'Ok',
                    role:'Stay',
                    handler: () => {
                      console.log('Stay here');
                    }
                  }
                ]
              });
              alert.present();
            }
            
          }
          
        });
  }

  toSignup(){  //the buttton that will send the user back to sign up page
    this.navCtrl.push(SignupPage);
  }

  toChange(){
    this.navCtrl.push(PasswordChangePage);
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
