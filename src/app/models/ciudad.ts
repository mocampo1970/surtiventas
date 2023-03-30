// Debe tener los mismos atributos de la clase en java en spring boot
// y con los mismos datos, esta se crea como una clase, aqui me sacaba error en spring boot y no grababa
// nada porque tenia name y description y en spring boot tiene nombre y descripcion obviamente 

import { Pais } from "./pais";

// no iba a mapear y aqui en angular en el debug por chrome salia error http 500.
export class Ciudad {
    id: number = 0;
    nombre: string = '';
    pais: Pais = {
        id: 0, 
        nombre: ''
    }
}
