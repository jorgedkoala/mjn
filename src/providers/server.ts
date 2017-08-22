import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';
/*
  Generated class for the Server provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Servidor {

  constructor(public http: Http, private device: Device) {
    console.log('Hello Server Provider');
  }

  getObjects(url: string, param: string) {
    let parametros = '?token=' + sessionStorage.getItem('token') + param; 
    return this.http.get(url + parametros)
      .map((res: Response) => JSON.parse(res.json()));
  }

  postObject(url: string, object: Object, param?: string) {
    let payload = JSON.stringify(object);
    let paramopcional = '';
    if (param !== undefined){
      paramopcional = param;
    }
    paramopcional += "&userId="+this.device.uuid;
    let parametros = '?token=' + sessionStorage.getItem('token') +paramopcional;
    return this.http.post(url + parametros, payload)
      .map((res: Response) => JSON.parse(res.json()));
  }

  putObject(url: string, param: string, object: Object) {
    let payload = JSON.stringify(object);        
    let parametros = param + '&token=' + sessionStorage.getItem('token')+"&userId="+this.device.uuid;
    return this.http.put(url + parametros, payload)
      .map((res: Response) => JSON.parse(res.json()));
  }
  
  deleteObject(url: string, param: string) {
    let parametros = param + '&token=' + sessionStorage.getItem('token')+"&userId="+this.device.uuid;
    return this.http.delete(url + parametros)
      .map((res: Response) => JSON.parse(res.json()));
  }

}
