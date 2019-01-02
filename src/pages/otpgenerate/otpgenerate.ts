import { Component } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { VerificationPage } from '../verification/verification';

/**
 * Generated class for the OtpgeneratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otpgenerate',
  templateUrl: 'otpgenerate.html',
})
export class OtpgeneratePage {
  pno: string; //retrieve phone number
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertctrl:AlertController,private http: HttpClient) {
  }

  toEnter(){
    let data = {
      pno: this.pno,
    };
    if(this.pno.length==11 && isNaN(parseFloat('this.pno'))){
      this.http.post('http://localhost:8080/voter/otpmsg', data).subscribe(response => {
        let alert = this.alertctrl.create({
          title:'',
          message:'Check Your phone and Enter verification code',
          
          buttons: [{
              text: 'Ok',
              handler: data => {
                this.navCtrl.push(VerificationPage,{
                  pno: this.pno});//send hone number to next page for user identity
                console.log('POST Response:', response);
              }
            }
          ]
        });
        alert.present();
        },error=>{
            let alert = this.alertctrl.create({
              title:'Invalid phone nnumber',
              
              buttons: [{
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
      }else{
        let alert = this.alertctrl.create({
          title:'Invalid phone number',
          
          buttons: [{
              text: 'Ok',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpgeneratePage');
  }

}

