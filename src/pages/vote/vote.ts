import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HelloIonicPage} from '../hello-ionic/hello-ionic';

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

  public count=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertctrl:AlertController) {
  
  }



  public checklists = [
    {
        title: 'Checklist 1',
        checked: false
    },
    {
        title: 'Checklist 2',
        checked: false
    },
    {
        title: 'Checklist 3',
        checked: false
    }
];


  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
  }

  // if(document.getElementById('gender_Male').checked) {
  //   //Male radio button is checked
  // }else if(document.getElementById('gender_Female').checked) {
  //   //Female radio button is checked
  // }

  toCastVote() {
     //this is supposed to be the code where the app checks if there's still unchecked list. How??
    if (this.checklists.filter(c=>c.checked==false).length>0){
    this.ErrorAlert();
    } else {
        this.VoteAlert();
    }
}

  ErrorAlert(){
    let alert = this.alertctrl.create({
      title: 'Invalid Vote',
      message: 'Please select a candidate from each category!',
      
      buttons: [
        {
          text: 'Ok',
          role: 'Ok',
          handler: () => {
            console.log('Ok clicked');
          }
        },
        {
          text: 'Exit',
          role:'Exit',
          
          handler: () => {
            this.navCtrl.push(HelloIonicPage);
            console.log('leave clicked');
          }
        }
      ]

  });
  //this.nav.present(alert);
  alert.present(); 
}


  VoteAlert(){//if the votes are less
    let alert = this.alertctrl.create({
      title:'Confirm Vote',
      message:'You are about to cast your vote.Confirm ?',

      buttons: [
        {
          text: 'Confirm',
          role: 'Confirm',
          handler: () => {
            console.log('Confirm clicked');
          }
        },
        {
          text: 'Change',
          role:'Change',
          handler: () => {
            console.log('Change clicked');
          }
        }
      ]
    });
    alert.present();
  }

  

  toVote(){
    this.navCtrl.push(LoginPage);
  }

  

}
