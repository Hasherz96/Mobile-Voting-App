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
import { PasswordChangePage } from '../pages/password-change/password-change';
import { OtpgeneratePage } from '../pages/otpgenerate/otpgenerate';
import { VerifyPage } from '../pages/verify/verify'


import { CountdownModule } from 'ngx-countdown';
import { CountdownPage } from '../pages/countdown/countdown';

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
    CountdownPage,
    PasswordChangePage,
    OtpgeneratePage,
    VerifyPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    CountdownModule
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
    CountdownPage,
    PasswordChangePage,
    OtpgeneratePage,
    VerifyPage

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
