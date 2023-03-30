import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  // Vamos a darle la url que tiene el spring boot, vamos a la clase PaisController 
  // y alli halamos api/Pais y como esa aplicacion corre en http://localhost:8080
  // simplemente juntamos al url + api/Pais y queda http://localhost:8080/api/Pais
  // o en el postman con las pruebas que hicimos http://localhost:8080/api/Pais
  // aqui mapeamos la URL del backend http://localhost:8080/api/Pais y alla en spring boot 
  // que es el backend mapeamos en PaisController la de aqui http://localhost:4200
  // @CrossOrigin(origins = "http://localhost:4200")
  // @GetMapping("api/Pais")	  
  // private url: string = "http://localhost:8080/api/Pais"; 
  private url: string = "/api/paises"; 
   
  // Url obtenida de la variable de enviroments, esta seria la forma ideal para no tener que 
  // declarar en cada servicio la url de trabajo y en cada servicio se concatenaria la parte por ejm
  // aqui en category api/category
  baseUrl = environment.baseUrl + this.url;

  // inyectamos el httpClient
  constructor(private httpClient: HttpClient) { }

 // Metodo para conectarnos a la url, embueltos en un observable, apuntaria al metodo
  // obtener del paisController que devuelve una lista de paises
  // Obtiene los paises, como el metodo desde al controller devuelve una lista aqui 
  // tambien debe retornar una lista por eso va entre [] tanto en la firma del metodo como en el 
  // retorno despues el httpClient.get, aqui acabe de probar el 
  // getAll() { -> asi sin retornar observable y tambien funciona.  
  getAll(): Observable<Pais[]>{
    return this.httpClient.get<Pais[]>(this.baseUrl);
  }

  // Obtener un producto en la apirest hace referencia a obtenerProducto que se llama 
  // con Getmapping y asi como en el springboot en el productoController en el metodo
  // obtenerProducto pasa un integer que es el id, aqui debe ser lo mismo
  get(id: number): Observable<Pais>{
    return this.httpClient.get<Pais>(this.baseUrl+'/'+id);
  }  

  // Metodo que permite crear el pais, o sea llama al postmapping del apirest.
  addPais(Pais: Pais): Observable<Pais>{
    return this.httpClient.post<Pais>(this.baseUrl, Pais);  
  }

  // Actualizar y va al metodo actualizarPais del springboot con putmapping
  // devuelve un pais
  update(Pais: Pais): Observable<Pais>{
    return this.httpClient.put<Pais>(this.baseUrl, Pais);
  }

  // Eliminar vamos al eliminar del PaisController del spring boot y alli elimina por 
  // id, aqui es lo mismo
  delete(id: number): Observable<Pais>{
    return this.httpClient.delete<Pais>(this.baseUrl+'/'+id )
  }  
}
