import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Candidates } from './item-details.model'; //importing model


@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  candidates: Candidates[]=[];
  // public jsonObject: any;
  // checklistObserver: any;  

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }
  ngOnInit(){ //load candidates details
    this.getCandidates().subscribe(
      candidates=>{
        this.candidates=candidates as Candidates[];
        console.log(this.candidates);
      })
  }

  getCandidates(){ //getting candidates details
    return this.http.get('http://localhost:8080/candidates');
  }
}
