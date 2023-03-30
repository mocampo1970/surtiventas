import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Servicio que me va a ayudar a traducir
export class TranslateService {

  private _data: any;

  // Inyecta el httpClient
  constructor(private http: HttpClient) {
  }

  public getData() {

    // Coloque este mensaje para saber mi navegador que lenguaje tiene
    console.log("navigator.language", navigator.language);

    return new Promise((resolve, reject) => {
      this.http.get('assets/translations/' + navigator.language + '.json')
        .subscribe(data => {
          this._data = data;
          resolve(true);
        }, error => {
          console.log('Error al recuperar las traducciones: ' + error);
          reject(true);
        });
    })    // Cierra la promise
  }

  public getTranslate(phrase: string) {
    return this._data[phrase];
  }


}
