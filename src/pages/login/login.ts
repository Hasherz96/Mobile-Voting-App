import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {SignupPage} from '../signup/signup';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { PasswordChangePage } from '../password-change/password-change'
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

  formgroup: FormGroup;
  email: AbstractControl;
  password: AbstractControl;  

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private alertctrl:AlertController,public formbuilder:FormBuilder) {
    this.formgroup = formbuilder.group({
      email:['',Validators.required],
      password: ['',Validators.required]
    });
    this.email = this.formgroup.contains['email'];
    this.password = this.formgroup.contains['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  toLog(formGroup: FormGroup){

    let data = {
      email: this.email,
      password: this.password,
    };

    // form = new FormGroup({
    //   email: new FormControl(this.email, Validators.required),
    //   password: new FormControl(this.password, Validators.required)
    // });

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
                message:'Please Try Again!',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      
                    }
                  }
                ]
              });
              alert.present();
              

            }else if(error.status==404){//invalid email

              let alert = this.alertctrl.create({
                title:'Invalid Login',
                message:'We cannot recognize your email or password.\nPlease Try Again!',
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
