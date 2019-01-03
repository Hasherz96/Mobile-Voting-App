import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { Candidate } from '../vote/vote.model';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  
    /*Declaring object to display in the Ui*/
  data:Candidate[]=[];
 

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private http:HttpClient) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    console.log("The selected item : "+ this.selectedItem.title);
  }


  ngOnInit(){ 
    
     this.getdata().subscribe(
         data=>{
       this.data= data as Candidate[];
       console.log(this.data[0]); 
       console.log(this.data[0].candidatename); 
 
     })
 
      
   } 
 
   getdata(){ //these two defined differently as the db does not contain spaces
     if (this.selectedItem.title=="Vice President"){ 
      return this.http.get('http://localhost:8080/candidates/VicePresident');
     }
     else if(this.selectedItem.title=="Commitee Members"){
      return this.http.get('http://localhost:8080/candidates/Committee');
     }
     else {return this.http.get('http://localhost:8080/candidates/'+this.selectedItem.title);}
   }
 
  
 

}
