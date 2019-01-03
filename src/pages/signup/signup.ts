import { Component } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { CountdownPage } from '../countdown/countdown';

import { Platform } from 'ionic-angular';
import { VerifyPage } from '../verify/verify';

import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms'


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formgroup:FormGroup;
  userName: AbstractControl;
  registrationnumber: AbstractControl;
  email: AbstractControl;
  phonenumber: AbstractControl;
  password: AbstractControl;
  cpassword: AbstractControl

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams,private alertctrl:AlertController,private http: HttpClient,public formbuilder:FormBuilder) {
    this.formgroup = formbuilder.group({
      userName: ['',Validators.required],
      registrationnumber: ['',Validators.required],
      email: ['',Validators.required],
      phonenumber: ['',[Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      password: ['',[Validators.required, Validators.minLength(8)]],

      cpassword: ['',Validators.required],
    });
    this.userName = this.formgroup.contains['userName'];
    this.registrationnumber = this.formgroup.contains['registrationnumber'];
    this.email = this.formgroup.contains['email'];
    this.phonenumber = this.formgroup.contains['phonenumber'];
    this.password = this.formgroup.contains['password'];
    this.cpassword = this.formgroup.contains['cpassword'];
  }

  exitApp(){
    this.platform.exitApp();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  toVerify(){ //to link the page to home
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

                    this.navCtrl.push(VerifyPage);

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
                title:'Unauthorized Access',
                message:'We do not recognize this user. Please try again',
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
                title:'Sorry!',
                message:'The User already exists',
                buttons: [
                  {
                    text: 'OK',
                    role:'Stay',
                    handler: () => {
                      console.log('Stay here');
                    }
                  }
                ]
              });
              alert.present();
            }else{
              let alert = this.alertctrl.create({
                // title:'Try Again!',
                title:'Invalid SignUp',
                message:'Please Try Again',
                buttons: [
                  {
                    text: 'OK',
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

  // toCountdown(){
  //   this.navCtrl.push(CountdownPage);
  // }


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
