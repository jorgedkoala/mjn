import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController, Platform } from 'ionic-angular';
//import { BackgroundMode, Device } from 'ionic-native';
import { Device } from '@ionic-native/device';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

//******COMPONENTS THIRD */
import { TranslateService } from 'ng2-translate/ng2-translate';

//*** MODELS */
import { URLS } from '../../models/urls';
import { Diario } from '../../models/diario'
//*** Componentes */


//*** Providers */
import { Servidor } from '../../providers/server';

@Component({
  selector: 'page-diario',
  templateUrl: 'diario.html'
})

export class DiarioPage {
private horas:Object[];
private hora:number;
private entradaDiario: Diario = new Diario(null,this.device.uuid,null,1,null);
private time: string;
public storage: Storage;
public intensidad: string='suave';
public loader

  constructor(public navCtrl: NavController, public translate: TranslateService, private device: Device, private platform: Platform, public navParams: NavParams,private server:Servidor, storage:Storage,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {
    console.log('constructor DiarioPage');
    this.horas=[
      {description:"10minutos",valor:10},
      {description:"20minutos",valor:20},
      {description:"mediahora",valor:30},
      {description:"unahora",valor:60},
      {description:"custom",valor:0}
    ]
    this.storage = new Storage(['sqlite','indexeddb','websql','localstorage']);
    this.storage.get("contador").then(
      (cuenta)=>{
        (isNaN(cuenta))?this.entradaDiario.contador=1:this.entradaDiario.contador=cuenta++;
        },
      (error)=>alert(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiarioPage');
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
  }

selectHora(){
  if(this.hora>0){
    console.log(this.hora)

this.entradaDiario.fecha =  moment(new Date()).subtract(this.hora,'minutes').format('YYYY-MM-DD HH:mm');
//console.log(this.entradaDiario.fecha,  moment(new Date()).subtract(this.hora,'minutes').format('DD-MM-YYYY HH:mm'))
  }else{
    console.log(new Date(),moment().format('hh:mm'))
    this.time = moment().format('hh:mm');
  }
}
setIntensidad(){
switch (this.entradaDiario.intensidad){
  case 1:
  this.intensidad ="suave"
  break;
  case 2:
  this.intensidad ="media";
  break;
  case 3:
  this.intensidad ="fuerte";
  break;
}
}
send(){
              if (!this.platform.is('mobile')){
              this.entradaDiario.uuid = 'fda52d3cf79aa426';
            }
            this.entradaDiario.uuid = this.device.uuid;
console.log('Enviando....',this.entradaDiario);
//this.loader.present();
let param = "&entidad=diario";
this.server.postObject(URLS.STD_ITEM,this.entradaDiario,param).subscribe(
    (data)=>{
      if (data.success){
        this.sayOk('ok');
        this.entradaDiario.contador +=1;
        this.storage.set("contador",this.entradaDiario.contador).catch((error)=>console.log('error al guardar'))
      }else{
        this.sayOk('notok');
      }
    },
    (error)=>  this.sayOk('notok',error),
    ()=>''//this.loader.dismiss()
);
}

setTime(){
  console.log(this.time, this.time.substr(0,2),this.time.substr(3,2))
this.entradaDiario.fecha =  moment(new Date()).set({'hour': parseInt(this.time.substr(0,2)), 'minute': parseInt(this.time.substr(3,2))}).format('YYYY-MM-DD HH:mm');
  
}


sayOk(status:string,error?:string) {
  let msg
  this.translate.get(status).subscribe((valor)=>{
    msg=valor
  });
  if (error) msg += " " + error;
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
