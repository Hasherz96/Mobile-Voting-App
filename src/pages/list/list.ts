import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
    //this.icons = ['person'];

    this.items = [];
   
      //this is  the navigation list
    this.items.push({title:'President', note:'',icon:'person'});
    this.items.push({title:'Vice President', note:'',icon:'person'});
    this.items.push({title:'Secretary', note:'',icon:'person'});
    this.items.push({title:'Treasurer', note:'',icon:'person'});
    this.items.push({title:'Commitee Members', note:'',icon:'person'});

    //console.log(this.items);
    }

  itemTapped(event, item) {
    
    console.log("******"+item.title);

    this.navCtrl.push(ItemDetailsPage, { item: item});
    

  }

  // itemTapped(event, item) {
    
  //  if (item=='President'){ this.navCtrl.push(PresidentPage, 'President');}
  //  else 
  //   this.navCtrl.push(ItemDetailsPage, { item: item});
  // }




}
