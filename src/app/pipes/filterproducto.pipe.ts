import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterproducto'
})
export class FilterproductoPipe implements PipeTransform {

   // Value equivale a todas las categorias en este caso
   transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultProductos = [];
    for (const producto of value) {
      if (producto.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultProductos.push(producto);
      };
    };
    return resultProductos;
  }  

}