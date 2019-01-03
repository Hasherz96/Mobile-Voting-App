import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {SignupPage} from '../signup/signup';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  token: String;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private alertctrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  }

  
  toVerify(){
    let data={
      token:this.token,
    }
    this.http.put('http://localhost:8080/voter/verify', data).subscribe(response => {
      let alert = this.alertctrl.create({
        message:'Login Successful',
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
      let alert = this.alertctrl.create({
        title:'Invalid Token',
        message:'Please try again',
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
    })
  }
}
