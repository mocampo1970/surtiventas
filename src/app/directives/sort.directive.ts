import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Sort } from '../util/sort';

// sort se explica a detalle en
// https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140
@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any> = [];
  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener("click")
  sortData() {
    // Crea el objeto de Sort Class
    const sort = new Sort();
    // Obtener referencia del elemento actual en el que se hizo clic
    const elem = this.targetElem.nativeElement;
    // Obtener en qué orden la lista debe ordenarse de forma predeterminada, debe configurarse para desc en el atributo del elemento
    const order = elem.getAttribute("data-order");
    // Obtenga el tipo de propiedad especialmente configurado [tipo de datos = fecha] si es un campo de fecha
    const type = elem.getAttribute("data-type");
    // Obtenga el nombre de la propiedad del atributo del elemento
    const property = elem.getAttribute("data-name");
    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
    }
    else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }
  }
  
}