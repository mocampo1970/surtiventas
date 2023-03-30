import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
// aqui en el servicio es donde vamos a crear todas las llamadas para nuestra api rest
// para guardar, insertar, eliminar. Y asocia/instancia el model producto.ts
export class ProductoService {

  // Vamos a darle la url que tiene el spring boot, vamos a la clase productoController 
  // y alli halamos api/Producto y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/Producto y queda http://localhost:8080/api/Producto
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/Producto
  // aqui mapeamos la URL del backend http://localhost:8080/api/Producto y alla en spring boot 
  // que es el backend mapeamos en productoController la de aqui http://localhost:4200
  // @CrossOrigin(origins = "http://localhost:4200")
  // @GetMapping("api/Producto")	  
  // private url: string = "http://localhost:8080/api/Producto"; 
  private url: string = "/api/productos"  

  // Url obtenida de la variable de enviroments, esta seria la forma ideal para no tener que 
  // declarar en cada servicio la url de trabajo y en cada servicio se concatenaria la parte por ejm
  // aqui en category api/category
  baseUrl = environment.baseUrl + this.url;  


  // inyectamos el httpClient  
  constructor(private httpClient: HttpClient) { }

  // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del ciudadController que devuelve una lista de ciudades
  // Obtiene las ciudades, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el httpClient.get, aqui acabe de probar el 
  // getAll() { -> asi sin retornar observable y tambien funciona. 
  // Aqui como el observable  
  getAll(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.baseUrl)
  } 

  // Obtener un estudiante en la apirest hace referencia a obtenerEstudiante que se llama 
  // con Getmapping y asi como en el springboot en el estudianteController en el metodo
  // obtenerEstudiante pasa un integer que es el id, aqui debe ser lo mismo
  get(id: number): Observable<Producto>{
    return this.httpClient.get<Producto>(this.baseUrl+'/'+id);
  }  

  // Metodo que permite crear el pais, o sea llama al postmapping del apirest.
  addProducto(producto: Producto): Observable<Producto>{
    return this.httpClient.post<Producto>(this.baseUrl, producto);  
  }

  // Actualizar y va al metodo actualizarPais del springboot con putmapping
  // devuelve un pais
  update(producto: Producto): Observable<Producto>{
    return this.httpClient.put<Producto>(this.baseUrl, producto);
  }

  // Eliminar vamos al eliminar del PaisController del spring boot y alli elimina por 
  // id, aqui es lo mismo
  delete(id: number): Observable<Producto>{
    return this.httpClient.delete<Producto>(this.baseUrl+'/'+id )
  }    
}


