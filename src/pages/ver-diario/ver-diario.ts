import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
/*
  Generated class for the VerDiario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ver-diario',
  templateUrl: 'ver-diario.html'
})

export class VerDiarioPage {
public user:string;
public password:string;
public uuid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerDiarioPage');
    if (this.device.platform === null)
    {
      this.uuid = 'fda52d3cf79aa426'
      this.user = 'fda5';
      this.password = '2d3c';
        }else{
    this.uuid = this.device.uuid;
    this.user = this.device.uuid.substr(0,4);
    this.password = this.device.uuid.substr(4,4);
    }
  }
verDiario(){
 window.open('http://mjn.ntskoala.com?uuid='+this.uuid+'', '_system', 'location=yes');
//  window.open('http://localhost:4200?uuid='+this.uuid+'', '_system', 'location=yes');
}
}
