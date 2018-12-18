import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { ListPage } from '../pages/list/list';
import { OcorrenciaPage } from '../pages/ocorrencia/ocorrencia';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { RequestProvider } from '../providers/request/request';
import { InputMaskModule } from 'ionic-input-mask';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InicioPage,
    OcorrenciaPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    InputMaskModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InicioPage,
    OcorrenciaPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RequestProvider
  ]
})
export class AppModule {}
