import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalVarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalVarProvider {
  public studentVoted=false; // to check if the student has voted in order to block the vote in home page

  constructor(public http: HttpClient) {
    console.log('Hello GlobalVarProvider Provider');
  }

}
