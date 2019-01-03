import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CountdownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-countdown',
  templateUrl: 'countdown.html',
  template: '<countdown [config]="{leftTime: 1000 * 10}">$!d!:$!h!:$!m!:$!s!</countdown>'

})
export class CountdownPage {

  countDownDate = new Date("jan 1, 2019 23:00:00").getTime()/1000;
  now = new Date().getTime()/1000; 
  distance = (this.countDownDate-this.now);

  


  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CountdownPage');
  }

}
