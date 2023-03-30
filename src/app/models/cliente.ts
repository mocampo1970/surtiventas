// no iba a mapear y aqui en angular en el debug por chrome salia error http 500.
export class Cliente {
    idCliente: number = 0;
    nombre: string = '';
    primerApellido: string = '';
    segundoApellido: string = '';
    telefono: string = '';
    emailPersonal: string = '';
    emailLaboral: string = '';
    /*ciudadncto: Ciudad = {
        id: 0,
        nombre: '',
        pais: Pais = {
            id: 0,
            nombre: ''
        }
    };*/
    fechancto: Date = new Date();
    /*ciudadresidencia: Ciudad = {
        id: 0,
        nombre: '',
        pais: Pais = {
            id: 0,
            nombre: ''
        }
    };*/    
    direccionResidencia: string = '';
    observaciones: string = '';

}