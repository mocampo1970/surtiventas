import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ConfigService } from 'src/app/services/config.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public titulo: string = "Lista de productos";
  // definimos la vble estudiantes que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  productos: Producto[] = [];  

  // propiedad que se utiliza en el producto.html en el filtro
  filterProducto = '';

    // este va a traer en el constructor lo que tenga configurado el config en el 
  // campo itemsCategoriesPage y page que configuran las paginas por pantalla
  public page: number;
  public itemsPage: number;    

  // se inyecta el productoservice para operaciones y adicional se inyecta la paginación
  constructor(private productoService: ProductoService, private config: ConfigService) { 

    // inicializa vbles de paginación
    this.page = 1;
    this.itemsPage = this.config.itemsCategoriesPage; 
  }

  ngOnInit(): void {
    
    // Obtengo los productos, ese listproductos es una vble como un alias.
    //=======================================================================================================
    // Nota importante:  ESTO SE puede hacer asi como sigue en estas 3 lineas o como las de abajo que muestra 
    //                   tambien el console.error("Error al recuperar las categorias: " + error);
    //=======================================================================================================
    //this.productoService.getAll().subscribe(
    //  listProductos => this.productos = listProductos
    //);
    console.log("ngOnInit de productos.component.ts");   

    this.productoService.getAll().subscribe(listProductos => {
      this.productos = listProductos;
      console.log("recupero los productos: " , listProductos);      
    }, error => {
      console.error("Error al recuperar los productos: " , error);
    })    

  }

  delete(producto: Producto){
     // Tema de sweetalert2
     Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "El registro del producto: " + producto.codigo + ' ' + producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // Si confirman que eliminan 
      if (result.isConfirmed) {
        // Vamos a ingresar aqui el codigo de eliminar
        this.productoService.delete(producto.id).subscribe(
          res => this.productoService.getAll().subscribe(
          response => this.productos = response  
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
