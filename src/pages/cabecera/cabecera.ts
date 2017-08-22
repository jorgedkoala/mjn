import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Nav } from 'ionic-angular';

//******MY COMPONENTS */
import { HomePage } from '../home/home';
//import { ContactPage } from '../pages/contact/contact';
import { ContactPage } from '../contact/contact';
import { ConfigPage } from '../config/config';



@Component({
  selector: 'cabecera',
  templateUrl: 'cabecera.html'
})
export class CabeceraPage {
  @ViewChild(Nav) nav: Nav;
  public pages:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CabeceraPage');
        this.pages = [
      {title:"title", component:"component"},
      { title: 'menu.home' , component: HomePage },
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
}
