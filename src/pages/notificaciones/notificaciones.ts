import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge';


/*
  Generated class for the Notificaciones page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html'
})
export class NotificacionesPage {
public dbNotificaciones: Storage;
public notificaciones: any[];
public ios9:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private badge: Badge, public storage: Storage, private platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
    if (this.platform.is('ios')) {
      console.log(this.platform.versions());
      let versions = this.platform.versions();
      if (versions.ios.major < 10) this.ios9 = true;
      console.log('I am an iOS device!');
    }
      this.notificaciones=[];
          this.dbNotificaciones = new Storage(['sqlite','indexeddb','websql','localstorage']);

          setTimeout(()=>{
          this.dbNotificaciones.get("notificaciones").then(
            //this.storage.get("notificaciones").then(
            (resultado)=>{if(resultado){
              this.notificaciones = JSON.parse(resultado);
              console.log(this.notificaciones);
            }

            },
            (error) =>console.log("error recuperando notificaciones",error)
          );

          this.badge.clear();
          this.dbNotificaciones.set("badge",0);
          },500);
}



clearMsgs(){
  //console.log('borrando', this.dbNotificaciones)
  this.dbNotificaciones.set("notificaciones",null)
  .then((resultado)=>{
    this.notificaciones=null;
    console.log(resultado);
  }
  )
  .catch((error)=>console.log('error al guardar notificaciones',error));
 }


}
