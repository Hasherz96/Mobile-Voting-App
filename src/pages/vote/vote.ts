import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVarProvider } from '../../providers/global-var/global-var';
import { Voted } from '../vote/vote.model';
import { Candidate } from '../vote/vote.model';

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

  Voted:Voted[];
  /*Declaring objects to display in the Ui*/
  President:Candidate[]=[];
  VPresident:Candidate[]=[];
  Secretary:Candidate[]=[];
  Treasurer:Candidate[]=[];
  Editor:Candidate[]=[];
  Committee:Candidate[]=[];
 
  /*Checking if all were voted*/
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
  roles=[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertctrl:AlertController,
    public global: GlobalVarProvider,
    private http:HttpClient) {
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
          handler: () => { //after confirmation sending the vote to database
           // this.sendToDb();
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

    // var vote = this.cm2;
    // if (vote != "na") count +=1;
    // console.log("****"+this.cm2);
    // console.log(count);

    // var vote = this.cm3;
    // if (vote != "na") count +=1;
    // console.log("****"+this.cm3);
    // console.log(count);

    if(count==6){
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

  // presidentSelect(value){
  //   console.log(value);
  // }

  ngOnInit(){ //to get the candidates to display on page
   // var roles =["President","Treasurer","Secretary"]
    //"editor","juniorTresurer","cm1","cm2","cm3"];
    
    // for(let i=0;i<3;i++){
    //   var roleNeeded=roles[i];

    this.getPresident().subscribe(
        President=>{
      this.President= President as Candidate[];
      console.log(this.President);

    })

    this.getVicePresident().subscribe(
        VPresident=>{
      this.VPresident= VPresident as Candidate[];
      console.log(this.VPresident);

    })

    this.getSecretary().subscribe(
        Secretary=>{
    this.Secretary= Secretary as Candidate[];
    console.log(this.Secretary);

    })
    
    this.getEditor().subscribe(
        Editor=>{
    this.Editor= Editor as Candidate[];
    console.log(this.Editor);

    })

    this.getTresurer().subscribe(
        Treasurer=>{
    this.Treasurer= Treasurer as Candidate[];
    console.log(this.Treasurer);

    })

    this.getCommittee().subscribe(
        Committee=>{
    this.Committee= Committee as Candidate[];
    console.log(this.President);

    })

     
  } 

  getPresident(){
    return this.http.get('http://localhost:8080/candidates/President');
  }

  getSecretary(){
    return this.http.get('http://localhost:8080/candidates/Secretary');
  }

  getTresurer(){
    return this.http.get('http://localhost:8080/candidates/Treasurer');
  }

  getEditor(){
    return this.http.get('http://localhost:8080/candidates/Editor');
  }

  getVicePresident(){
    return this.http.get('http://localhost:8080/candidates/VicePresident');
  }

  getCommittee(){
    return this.http.get('http://localhost:8080/candidates/Committee');
  }


  

  // sendToDb(){ //sending the data to database
  //   var roles =["president","vicePresident","secretary","editor","juniorTresurer","cm1","cm2","cm3"];
   
  //   for(let i=0;i<8;i++){   
  //     this.roles[i]=this.Voted[i][roles[i]];
  //   }

  //   for(let i=0;i<8;i++){
  //    console.log(this.Voted);
  //   }
    

  // }
 



}


