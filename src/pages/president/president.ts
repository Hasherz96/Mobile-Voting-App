import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { President } from './president.model';

/**
 * Generated class for the PresidentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-president',
  templateUrl: 'president.html',
})
export class PresidentPage {

  president:President[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresidentPage');
  }

  ngOnInit(){ //to get all the president candidates to the page
    this.getPresident().subscribe(
        president=>{
    
      this.president= president as President[];
      console.log(this.president);
    
     }
    
  
    )}

  getPresident(){ //get the details of the President
    return this.http.get('http://localhost:8080/candidates/president');
  }

}
