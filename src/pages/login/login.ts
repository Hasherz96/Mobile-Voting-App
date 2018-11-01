import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
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

}
