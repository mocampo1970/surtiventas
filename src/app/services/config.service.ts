import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
// import 'lodash'; // es otra forma de importar lodash

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _data: any;

  constructor(private http: HttpClient) { }

  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/config/app-config.json').subscribe(data => {
          this._data = data;
          console.log('data http.get de app-config.json: ' , data);
          resolve(true);
        }, error => {
          console.log('Error al obtener la configuracion: ' + error);
          reject(true);
        });
    })
  }

  // Creo un metodo get por cada propiedad que tenga el app-config.json
  get logo(){
    return _.get(this._data, 'logo');
  }

  get logoLogin() {
    return _.get(this._data, 'logoLogin');
  }

  // Con estos nombres se capturan en vista/ventana por ejm este se utiliza en sidebar.component.html
  get nameSite(){
    return _.get(this._data, 'name_site');
  }  

  get itemsCategoriesPage() {
    return _.get(this._data, 'itemsCategoriesPage');
  }

  get itemsRegistriesPage() {
    return _.get(this._data, 'itemsRegistriesPage');
  }

  get yearStart() {
    return _.get(this._data, 'yearStart');
  }
  get yearEnd() {
    return _.get(this._data, 'yearEnd');
  }

  get min(){
    return _.get(this._data, 'min');
  }

  get max(){
    return _.get(this._data, 'max');
  }  

  get numUsers(){
    return _.get(this._data, 'num_users');
  }

}
