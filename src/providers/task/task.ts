import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {
  apiBaseUrl:string="";
  constructor(public http: HttpClient) {
    this.apiBaseUrl = "http://localhost:8080/MobileApp"
    console.log('Hello TaskProvider Provider');
  }

}
