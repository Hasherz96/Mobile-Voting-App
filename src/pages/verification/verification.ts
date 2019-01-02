import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  vcode:String;
  pno: String;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertctrl:AlertController,private http: HttpClient) {
    let pno=navParams.get('pno');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }

  toVerify(){
    let data = {
      pno: this.pno,
    };
    this.http.post('http://localhost:8080/voter/otpverify', data).subscribe(response => {
          this.navCtrl.push(HelloIonicPage);
        },error=>{
            let alert = this.alertctrl.create({
              message:'Invalid verification ',
              
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
  }
}
