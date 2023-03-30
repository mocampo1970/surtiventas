import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterciudad'
})
export class FilterciudadPipe implements PipeTransform {

   // Value equivale a todas las categorias en este caso
   transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultCiudades = [];
    for (const ciudad of value) {
      if (ciudad.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultCiudades.push(ciudad);
      };
    };
    return resultCiudades;
  }  

}
