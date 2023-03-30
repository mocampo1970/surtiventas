import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ciudad } from '../models/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
 // Vamos a darle la url que tiene el spring boot, vamos a la clase ciudadController 
  // y alli halamos api/Ciudad y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/Pais y queda http://localhost:8080/api/Ciudad
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/Ciudad
  // aqui mapeamos la URL del backend http://localhost:8080/api/Ciudad y alla en spring boot 
  // que es el backend mapeamos en CiudadController la de aqui http://localhost:4200
  // @CrossOrigin(origins = "http://localhost:4200")
  // @GetMapping("api/Ciudad")	  
  // private url: string = "http://localhost:8080/api/Ciudad"; 
  private url: string = "/api/ciudades"
  
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
  getAll(): Observable<Ciudad[]>{
    return this.httpClient.get<Ciudad[]>(this.baseUrl)
  }

  // Obtener un pais en la apirest hace referencia a obtenerPais que se llama 
  // con Getmapping y asi como en el springboot en el productoController en el metodo
  // obtenerProducto pasa un integer que es el id, aqui debe ser lo mismo
  get(id: number): Observable<Ciudad>{
    return this.httpClient.get<Ciudad>(this.baseUrl+'/'+id);
  }    

  // Metodo que permite crear la ciudad, o sea llama al postmapping del apirest. 
  addCiudad(ciudad: Ciudad): Observable<Ciudad>{
    return this.httpClient.post<Ciudad>(this.baseUrl, ciudad);
  }

  // Actualizar y va al metodo actualizarCiudad del springboot con putmapping
  // devuelve una ciudad
  update(ciudad: Ciudad): Observable<Ciudad>{
    return this.httpClient.put<Ciudad>(this.baseUrl, ciudad);
  } 

  // Eliminar vamos al eliminar del PaisController del spring boot y alli elimina por 
  // id, aqui es lo mismo
  delete(id: number): Observable<Ciudad>{
    return this.httpClient.delete<Ciudad>(this.baseUrl+'/'+id )
  }  


}
