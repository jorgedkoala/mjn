import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';

import { URLS } from '../../models/urls';


//*** Providers */
import { Servidor } from '../../providers/server';


//******COMPONENTS THIRD */
import { TranslateService } from 'ng2-translate/ng2-translate';

/*
  Generated class for the Config page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
public devices:any[]=[];
public baseurl = '';
public time:number = 0;
public contador:number = 1;
public mitexto:string;
public idioma:string;
public lang: Storage;

  constructor(public navCtrl: NavController,private file: File, public translate: TranslateService, public navParams: NavParams, public platform: Platform, public blT: BLE, private server:Servidor, private oneSignal: OneSignal) {
        platform.ready().then(() => {
      if (platform.is('android')){
        this.baseurl='/android_asset/www/assets/';
      }
      else{
        this.baseurl='./assets/';
      }
       this.lang = new Storage(['sqlite','indexeddb','websql','localstorage']);
      
        this.lang.get("lang").then(
          (lang)=> {
            if (lang){
            this.idioma=lang
            }
            },
          (error) =>console.log('error al recuperar idioma', error)
        )

      //this.creaFile();

});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
   
  }

setIdioma(){
  console.log(this.idioma);
  if (this.idioma){
this.translate.use(this.idioma);
this.lang.set("lang",this.idioma).catch((error) =>console.log('error al guardar idioma', error));
this.defineNotificationlanguage()
  }
}

defineNotificationlanguage(){
  let oneSignalIds;
  this.oneSignal.getIds().then(
    (idOneSignal)=>{
      console.log ("Ids",idOneSignal);
      oneSignalIds = idOneSignal.userId;

        console.log ("Id",oneSignalIds)
let param = "&language="+this.idioma+"&playerId="+oneSignalIds;
this.server.getObjects(URLS.SET_LANG,param).subscribe(
    (data)=>{
      console.log(data)
      if (data){
        console.log('ok');
      }else{
        console.log('notok');
      }
    },
    (error)=>  console.log('notok',error),
    ()=>''//this.loader.dismiss()
);
    }
  );

}

ok(){
this.navCtrl.pop().catch((error)=>console.log("Error al cerrar la página de configuración",error));
}



doSomething(position){
//this.time ++;
this.contador ++;
let texto = 'text_ejemplo:'+ new Date()+'#'+this.calculos(this.contador);
//console.log('posicion: '+ this.contador, 'time: ' +this.time);
//File.writeFile(File.dataDirectory, 'TestingLog',texto,{append: true} );
this.escribe(texto)
if (this.contador>60){
  this.contador =1;
//  this.media1.seekTo(1000);
}
}

calculos(time:number){
let resultado = 0;
  for (let x= 1;x<20;x++){
    resultado += time*x;
  }
  return resultado;
}
ble(){
  if (this.blT.isEnabled){
    alert('enabled ble,buscando...');
  this.blT.startScan([]).subscribe(
    (result) =>{
      console.log("devicing",JSON.stringify(result))
      this.devices.push(JSON.stringify(result))
    },
    (error)=>alert(error),
    ()=>console.log('fin')
  );
  }else{
    alert('not enabled ble');
  }
// this.escribe('algo...');
// this.lee();
}
stop(){
  this.blT.stopScan().catch((error)=>console.log('no se ha podido para la busqueda ble', error));
}
creaFile(){
  //File.checkDir(File.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
  this.file.createFile(this.file.dataDirectory, 'TestingLog', true).then(
    (resultado)=>{
      console.log('resultado',resultado);
    },
    (error)=>{console.log(error)}
  );
}
escribe(escrito){
  this.file.writeFile(this.file.dataDirectory, 'TestingLog',escrito,{append: true} );
}
lee(){
    this.file.readAsText(this.file.dataDirectory,'TestingLog').then(
    (resultado)=>{
      console.log(resultado)
      this.mitexto=resultado},
    (error)=>console.log(error)
  )
}
}
