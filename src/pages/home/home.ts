import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { OneSignal } from '@ionic-native/onesignal';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge';
import { Events } from 'ionic-angular';

//*** MODELS */
import { URLS } from '../../models/urls';

//*** Componentes */
import { DiarioPage } from '../diario/diario';
import { NotificacionesPage } from '../notificaciones/notificaciones';
//*** Providers */
import { Servidor } from '../../providers/server';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dbNotificaciones: Storage;
  public notificaciones:any[];
  constructor(public navCtrl: NavController, private server: Servidor, public platform:Platform, public evento: Events) {
    console.log('constructor home');

  platform.ready().then(
    
    (valor)=>{

            

    },
    (error) => console.log('algo ha ido mal al iniciar la plataforma')
     
  );
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Home Page');
    // this.server.getObjects(URLS.STD_ITEM,"").subscribe(
    //   (data) => {
    //     if (data.success){
    //       console.log(data);

    //     }
    //   }
    // );
  }

}
