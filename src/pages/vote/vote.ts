import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import { GlobalVarProvider } from '../../providers/global-var/global-var';

/**
 * Generated class for the VotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})
export class VotePage {
  favoriteSeason="na";
  title="na";
  president="na";
  vicePresident="na";
  secretary="na";
  editor="na";
  juniorTresurer="na";
  cm1="na";
  cm2="na";
  cm3="na";
  pupilVoted=false;
   

  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertctrl:AlertController,
    public global: GlobalVarProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
    
  }

  
  toVote(){// to vote and exit 
    let alert = this.alertctrl.create({
      title:'Confirm Vote',
      message:'You are about to confirm your vote. Proceed?',
  
      buttons: [
        {
          text: 'Confirm',
          role: 'Confirm',
          handler: () => {
            this.navCtrl.push(HelloIonicPage);
          }
        },
        {
          text: 'Back',
          role:'StayInPage',
          handler: () => {
            console.log('Stay in Page');
          }
        }
      ]
    });
    alert.present();
  }

  toValidate(){
    var count =0;

    // var roles =["president","vicePresident","secretary","editor","juniorTresurer","cm1","cm2","cm3"];
   
    // for(let i=0;i<8;i++){
      
    //   if (this.roles[i] !="na"){
    //     count+=1;
    //     console.log(count);
    //    // console.log(this.favoriteSeason);
    //   }
    // }
    // this.president="president";
    var vote = this.president;
    if (vote != "na") count +=1;
    console.log("****"+this.president);
    console.log(count);

    var vote = this.vicePresident;
    if (vote != "na") count +=1;
    console.log("****"+this.vicePresident);
    console.log(count);

    var vote = this.secretary;
    if (vote != "na") count +=1;
    console.log("****"+this.secretary);
    console.log(count);

    var vote = this.editor;
    if (vote != "na") count +=1;
    console.log("****"+this.editor);
    console.log(count);

    var vote = this.juniorTresurer;
    if (vote != "na") count +=1;
    console.log("****"+this.juniorTresurer);
    console.log(count);

    var vote = this.cm1;
    if (vote != "na") count +=1;
    console.log("****"+this.cm1);
    console.log(count);

    var vote = this.cm2;
    if (vote != "na") count +=1;
    console.log("****"+this.cm2);
    console.log(count);

    var vote = this.cm3;
    if (vote != "na") count +=1;
    console.log("****"+this.cm3);
    console.log(count);

    if(count== 8){
       // pupilVoted=true;
       this.global.studentVoted=true;
        this.toVote();   
    }
    else{
        this.toAlert();   
    }
  }

 
  toAlert(){
    let alert = this.alertctrl.create({
      title:'Invalid Vote',
      message:'Please select a candidate from each category',
  
      buttons: [
        {
          text: 'Okay',
          role: ' stay',
          handler: () => {}
        }
      ]
    });
    alert.present();
  
  }

  presidentSelect(value){
    console.log(value);
  }



}


