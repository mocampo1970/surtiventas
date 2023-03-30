import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpais'
})
export class FilterpaisPipe implements PipeTransform {

   // Value equivale a todas las categorias en este caso
   transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPaises = [];
    for (const pais of value) {
      if (pais.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPaises.push(pais);
      };
    };
    return resultPaises;
  }  

}
