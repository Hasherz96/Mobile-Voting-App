import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { OtpgeneratePage } from '../otpgenerate/otpgenerate';

/**
 * Generated class for the PasswordChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private alertctrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordChangePage');
  }
  toSubmit(){
    let data = {
      email: this.email
    };
    this.http.post('http://localhost:8080/voter/otp', data).subscribe(response => {
            this.navCtrl.push(OtpgeneratePage);
            console.log('POST Response:', response);
        },error=>{
          let alert = this.alertctrl.create({
            title:'Invalid Email',
            message:'Try again!',
            
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
          alert.present();
    });
  }
}
