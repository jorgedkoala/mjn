import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http'

//******  NATIVE */
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//******* PLUGINS */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { OneSignal } from '@ionic-native/onesignal';
import { Badge } from '@ionic-native/badge';
import { BLE } from '@ionic-native/ble';
import { SQLite } from '@ionic-native/sqlite';
import { BackgroundMode } from '@ionic-native/background-mode';


//import { BackgroundMode } from '@ionic-native/background-mode';
//PROVIDERS SERVICIOS
import { Servidor } from '../providers/server';
import { NotificacionService } from '../providers/notificacion-service';

//******COMPONENTS THIRD */
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

//******MY COMPONENTS */
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CabeceraPage } from '../pages/cabecera/cabecera';
import { ContactPage } from '../pages/contact/contact';
import { ConfigPage } from '../pages/config/config';
import { DiarioPage } from '../pages/diario/diario';
import { VerDiarioPage } from '../pages/ver-diario/ver-diario';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CabeceraPage,
    ContactPage,
    ConfigPage,
    DiarioPage,
    VerDiarioPage,
    NotificacionesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
   // IonicStorageModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '_ionicstorage',
         driverOrder:['sqlite','indexeddb','websql','localstorage']
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  //  CabeceraPage,
    ContactPage,
    ConfigPage,
    DiarioPage,
    VerDiarioPage,
    NotificacionesPage
  ],
  providers: [
    Servidor,
    NotificacionService,
    StatusBar,
    SplashScreen,
    Device,
    File,
    OneSignal,
    Badge,
    BLE,
    SQLite,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
