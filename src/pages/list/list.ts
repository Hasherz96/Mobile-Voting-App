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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
   

    this.items.push({title:'President', note:'',icon:'boat'});
    this.items.push({title:'Vice President', note:'',icon:'boat'});
    this.items.push({title:'Secretary', note:'',icon:'boat'});
    this.items.push({title:'Tresurer', note:'',icon:'boat'});
    this.items.push({title:'Commitee Member ', note:'',icon:'boat'});
  }

  itemTapped(event, item ){
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
