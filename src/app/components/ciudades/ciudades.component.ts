import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/ciudad';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  // definimos la vble ciudades que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros y adicional tambien se va a utilizar para ordenar como esto es un model ciudad
  // ahi trae todas las ciudades.
  ciudades: Ciudad[] = [];

  // propiedad que se utiliza en el pais.html en el filtro
  filterCiudad = '';

    // este va a traer en el constructor lo que tenga configurado el config en el 
  // campo itemsCategoriesPage y page que configuran las paginas por pantalla
  public page: number;
  public itemsPage: number;     

  constructor(private ciudadService: CiudadService, private config: ConfigService) { 
    // se inician las vbles de paginación
    this.page = 1;
    this.itemsPage = this.config.itemsCategoriesPage;
  }

  ngOnInit(): void {
  // Obtengo las categorias, ese listCategories es una vble como un alias.
    //=======================================================================================================
    // Nota importante:  ESTO SE puede hacer asi como sigue en estas 3 lineas o como las de abajo que muestra 
    //                   tambien el console.error("Error al recuperar las categorias: " + error);
    //=======================================================================================================
    //this.ciudadService.getAll().subscribe(
    //  listCiudades => this.ciudades = listCiudades
    //);

    this.ciudadService.getAll().subscribe(listCiudades => {
      this.ciudades = listCiudades;
      console.log("recupero las ciudades: " , listCiudades);      
    }, error => {
      console.error("Error al recuperar las ciudades: " , error);
    })

  }

  editarCiudad(ciudad: Ciudad){
  }

  delete(ciudad: Ciudad){

   // Tema de sweetalert2
   Swal.fire({
    title: 'Esta seguro que desea eliminar?',
    text: "El registro del producto: " + ciudad.id + ' ' + ciudad.nombre,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    // Si confirman que eliminan 
    if (result.isConfirmed) {
      // Vamos a ingresar aqui el codigo de eliminar
      // sacaba error porque le tenia en el pais.ts indefinido la vble la inicialice en 0
      this.ciudadService.delete(ciudad.id).subscribe(
        res => this.ciudadService.getAll().subscribe(
        response => this.ciudades = response  
        )
      ) 
      Swal.fire(
        'Eliminado!',
        'Tu registro fue eliminado.',
        'success'
      )
    }
  })    
  }
}
