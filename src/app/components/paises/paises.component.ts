import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais';
import { ConfigService } from 'src/app/services/config.service';
import { PaisService } from 'src/app/services/pais.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  // definimos la vble paises que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  paises: Pais[] = [];

  // propiedad que se utiliza en el pais.html en el filtro
  filterPais = '';

    // este va a traer en el constructor lo que tenga configurado el config en el 
  // campo itemsCategoriesPage y page que configuran las paginas por pantalla
  public page: number;
  public itemsPage: number;      

  constructor(private paisService: PaisService, private config: ConfigService) { 
    // inicializa vbles de paginación
    this.page = 1;
    this.itemsPage = this.config.itemsCategoriesPage; 
  }

  ngOnInit(): void {
    // Obtengo los paises, ese listpaises es una vble como un alias.
    //=======================================================================================================
    // Nota importante:  ESTO SE puede hacer asi como sigue en estas 3 lineas o como las de abajo que muestra 
    //                   tambien el console.error("Error al recuperar las categorias: " + error);
    //=======================================================================================================
    //this.paisService.getAll().subscribe(
    //  listPaises => this.paises = listPaises
    //);
    console.log("ngOnInit de paises.component.ts");   

    this.paisService.getAll().subscribe(listPaises => {
      this.paises = listPaises;
      console.log("recupero los paises: " , listPaises);      
    }, error => {
      console.error("Error al recuperar los paises: " , error);
    })
  }

  delete(pais: Pais){
    // Tema de sweetalert2
    Swal.fire({
     title: 'Esta seguro que desea eliminar?',
     text: "El registro del pais: " + pais.id + ' ' + pais.nombre,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!'
   }).then((result) => {
     // Si confirman que eliminan 
     if (result.isConfirmed) {
       // Vamos a ingresar aqui el codigo de eliminar
       this.paisService.delete(pais.id).subscribe(
         res => this.paisService.getAll().subscribe(
         response => this.paises = response  
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
