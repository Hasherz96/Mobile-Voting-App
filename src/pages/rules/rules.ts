import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rules } from './rules.model'; //importing model
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the RulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})
export class RulesPage {

  rules:Rules[]=[]; //getting the model in to rules
  public jsonObject: any;
  
  checklistObserver: any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http:HttpClient) {
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RulesPage');
  }

  ngOnInit(){ //to get the rules to the rules from Rules
    this.getRules().subscribe(
        rules=>{
    
      this.rules= rules as Rules[];
      console.log(this.rules);
    
     }
    
  
    )}
  
  getRules(){
    return this.http.get('http://localhost:8080/rules');
  }
  // this.http.post('http://localhost:8080/voter/signup', data).subscribe(response => {
  //           this.navCtrl.push(HelloIonicPage);
  //           console.log('POST Response:', response);
  //       });

}
