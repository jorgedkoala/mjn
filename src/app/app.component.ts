import { Component, ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

//import { StatusBar, Splashscreen,Device } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';

//******COMPONENTS THIRD */
import { TranslateService } from 'ng2-translate/ng2-translate';

//******MY COMPONENTS */
import { HomePage } from '../pages/home/home';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { ContactPage } from '../pages/contact/contact';
import { ConfigPage } from '../pages/config/config';
import { VerDiarioPage } from '../pages/ver-diario/ver-diario';

//******MY SERVICES */
import { Servidor } from '../providers/server';
import { NotificacionService } from '../providers/notificacion-service';
//*** MODELS */
import { URLS } from '../models/urls';
import { Usuario } from '../models/user'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  public db: Storage;
  public badge:string;
  pages: Array<{title: string, component: any}>;
  constructor(platform: Platform,private statusBar: StatusBar,private device: Device, private splashScreen: SplashScreen, public translate: TranslateService, public modalCtrl: ModalController, private server: Servidor, private notificaciones: NotificacionService, public evento: Events) {
        this.evento.subscribe('notificacionAbierta',(p)=>{
          console.log('evento lanzado',p);
      this.nav.push(NotificacionesPage);   
    });
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      splashScreen.hide();
      this.db = new Storage(['sqlite','indexeddb','websql','localstorage']);
      translate.setDefaultLang('es');
      translate.use('es');
      
      console.log(platform.is('browser'));

      this.db.get("lang").then(
      (lang)=> {
        console.log(lang);
          if (lang){
        this.db.get("lang").then(
          (lang)=> translate.use(lang),
          (error) =>console.log('error al recuperar idioma', error)
        )
      }else{
        this.presentConfigModal()
      }
    },
    (error)=> console.log('error recogiendo idioma',error)
      );

      this.db.get("user").then(
      (user)=> {
        let usuario:Usuario;
        console.log("getUser",user);
          if (user){
           usuario = JSON.parse(user);
           this.setUser(usuario);
          }else{
            if (!platform.is('mobile')){
              usuario = new Usuario('fda52d3cf79aa426','2d3c','fda5','',new Date(),new Date());
            }else{
          usuario = new Usuario(this.device.uuid,this.device.uuid.substr(4,4),this.device.uuid.substr(0,4),'',new Date(),new Date());
            }
            console.log("setting user",usuario);
          this.db.set("user",JSON.stringify(usuario));
          console.log("getUser",this.db.get("user"));
          this.setUser(usuario);
        }
    },
    (error)=> console.log('error recogiendo user',error)
      );
            this.db.get("badge").then(
            (num)=>{
             (num)?this.badge = (num):this.badge='0';
            })

    });


    // if (localStorage.getItem("lang") === null){
    //     localStorage.setItem("lang","es");
    //     translate.setDefaultLang('es');
    //     translate.use('es');
    //   }
    //   else {
    //       this.translate.use(localStorage.getItem("lang"));
    //       this.translate.setDefaultLang(localStorage.getItem("lang"));
    //   }
    this.pages = [
      {title:"title", component:"component"},
      { title: 'menu.home' , component: HomePage },
      { title: 'menu.verDiario' , component: VerDiarioPage},
      { title: 'menu.notificaciones' , component: NotificacionesPage },
      { title: 'menu.contact' , component: ContactPage },
       { title: 'menu.config' , component: ConfigPage }
      ];
  }

    openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
}
 presentConfigModal() {
   console.log('setModal');
   let configModal = this.modalCtrl.create(ConfigPage);
   configModal.present();
 }

setUser(usuario: Usuario){
usuario.ultimoacceso = new Date();
//this.entradaDiario.uuid = 'web' + (Math.random()*100).toString();
//this.loader.present();
console.log("usuario",usuario);
let params = "&user="+usuario.user+"&password="+usuario.password;
this.server.getObjects(URLS.LOGIN,params).subscribe(
(resultado)=>{
if (resultado.success == 'true'){
sessionStorage.setItem('token',resultado.token)
let param = "&entidad=users";
this.server.postObject(URLS.STD_ITEM,usuario,param).subscribe(
    (data)=>{
      if (data.success){
        this.sayOk('ok');
      }else{
        this.sayOk('notok1');
      }
    },
    (error)=>  
    {
    console.log(error);
    this.sayOk('notok2',error);
    },
    ()=>''//this.loader.dismiss()
)
} 
});
}
sayOk(log:string,error?:any){
  console.log(log,error)
}
}
