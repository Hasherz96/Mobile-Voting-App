import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { VotePage } from '../pages/vote/vote';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { TaskProvider } from '../providers/task/task';
import { RulesPage } from '../pages/rules/rules';
import { SettingsPage } from '../pages/settings/settings';
import { GlobalVarProvider } from '../providers/global-var/global-var';

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    VotePage,
    RulesPage,
    SettingsPage,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    VotePage,
    RulesPage,
    SettingsPage,

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TaskProvider,
    GlobalVarProvider
  ]
})
export class AppModule {}
