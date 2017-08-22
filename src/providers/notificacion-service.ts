import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
//
import 'rxjs/add/operator/map';
import { OneSignal } from '@ionic-native/onesignal';
import { Storage } from '@ionic/storage';
//import { SQLite } from '@ionic-native/sqlite';
import { Badge } from '@ionic-native/badge';
import { Events } from 'ionic-angular';

import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
/*
  Generated class for the NotificacionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotificacionService {
public badge:number;
  public dbNotificaciones: Storage;
  public notificaciones:any[];
  constructor(public http: Http, public platform:Platform, private storage: Storage, public evento: Events, private oneSignal: OneSignal, private _badge: Badge) {
    console.log('Hello NotificacionService Provider');
      platform.ready().then(
    
    (valor)=>{
      //  let mensaje = {payload:{title:'titulo 1',body:'mensaje 1'}}
      //  this.saveNotification(mensaje,'test');
    this.setNotificationsUp();
    },
    (error) => console.log('algo ha ido mal al iniciar la plataforma')
     
  );
  }

public setNotificationsUp(){
          this.dbNotificaciones = new Storage(['sqlite','indexeddb','websql','localstorage']);      
       this.dbNotificaciones.get("notificaciones").then(
            (resultado)=>{
              console.log(resultado)
              if(resultado){
              this.notificaciones = JSON.parse(resultado);
            }else{
              this.notificaciones=[];
            }
            });
      console.log('patform ready', this.platform.is('mobile'),this.platform.is('cordova'));
      if (this.platform.is('cordova')){
        this.oneSignal.startInit('e6314cc9-368d-4bb3-b982-24a87ff4a0fd','116086807648')

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe((message) => {
          // do something when notification is received
          this.saveNotification(message,'received');
          this.dbNotificaciones.get("badge").then(
            (badge)=>{
             (badge)?badge = badge+1:badge=1;
             this.dbNotificaciones.set("badge",badge).catch((error)=>console.log('error al guardar el badge',error));
             this._badge.set(badge);
            }
          );
          console.log('notification',message.data,message.payload)
        });
        this.oneSignal.handleNotificationOpened().subscribe((message) => {
          this.dbNotificaciones.get("badge").then(
            (badge)=>{
              badge = 0;
             this.dbNotificaciones.set("badge",badge).catch((error)=>console.log('error al guardar el badge',error));
             this._badge.set(badge);
            });
          //this.navCtrl.push(NotificacionesPage);  
          console.log('##############ABIERTA',message.notification.androidNotificationId,message.action.type)
          this.saveNotification(message.notification,'opened'); 
          
        });
          this.oneSignal.endInit();   
      }
}


saveNotification(message,fuente){
    //console.log(fuente,message.payload.title)
         this.dbNotificaciones = new Storage(['sqlite','indexeddb','websql','localstorage']);      
       this.dbNotificaciones.get("notificaciones").then(
            (resultado)=>{
              let nuevaNotificacion: number;
              console.log('leyendo notificaciones',resultado)
              if(resultado){
              this.notificaciones = JSON.parse(resultado);
            }else{
              this.notificaciones=[];
            }
            nuevaNotificacion = this.notificaciones.findIndex((notificacion)=>notificacion.idMsg == message.payload.notificationID)
            if (nuevaNotificacion < 0) {
          this.notificaciones.push({title:message.payload.title,body:message.payload.body,fecha:new Date(),'fuente':fuente,'idMsg':message.payload.notificationID});
          this.dbNotificaciones.set("notificaciones",JSON.stringify(this.notificaciones));
          this.evento.publish('notificacionAbierta');
            }
          },
          (error)=>console.log('error get notifications', error));
}


}
