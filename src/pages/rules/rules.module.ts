import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RulesPage } from './rules';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@NgModule({
  declarations: [
    RulesPage,
  ],
  imports: [
    IonicPageModule.forChild(RulesPage),
  ],
})
export class RulesPageModule {

  // getVote(){
  //   return this.http.get(environment.apiBaseUrl +'/getVote');
  
  // }
  

}


