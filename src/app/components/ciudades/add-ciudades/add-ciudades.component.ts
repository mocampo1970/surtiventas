import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from 'src/app/models/ciudad';
import { Pais } from 'src/app/models/pais';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-add-ciudades',
  templateUrl: './add-ciudades.component.html',
  styleUrls: ['./add-ciudades.component.css']
})
export class AddCiudadesComponent implements OnInit {

  // Creamos el modelo y abajo le asignamos valores para cuando consuma el api
  ciudad: Ciudad = new Ciudad();  

  // Tambien tenemos que recuperar los paises
  public paises: Pais[] = [];

  public isAdd: boolean = true;

  //================= formularios reactivos
  // Los formularios reactivos proporcionan un enfoque basado en modelos para manejar las entradas 
  // de los formularios cuyos valores cambian con el tiempo.
  // Instanciamos cada campo que tiene el formulario pero dentro del FormGroup
  // Al constructor le enviamos un json con cada campo que hay en el formulario por eso
  // debe ser con : por ejm si coloco algo dentro del formControl el lo muestra en pantalla
  // Nota: Si queremos que este formulario edite y ADD debemos colocar el id de la entidad o tabla
  //       en esta pantalla cuando se crea el FormGroup, cuando se hace el get ID, cuando se 
  //       hace el submit y cuando se hace el patchValue
  //       casi que debe tener los mismos campos que el model
  formularioRegistro = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    pais: new FormControl('', [Validators.required])
  })    


  // Inyectamos el servicio y mediante el cual nos vamos a conectar al api rest, adicional
  // declaramos router que nos va a permitir navegar entre la aplicación y devolvernos 
  // a la lista de ciudades, y 
  // ActivatedRoute Proporciona acceso a información sobre una ruta asociada con un componente
  constructor(private ciudadService: CiudadService, private router: Router,
    private activatedRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    // Cuando presione Editar en la  vista ciudades.components.html hace routerLink a 
    // esta vista addciudad con el parametro ciudad.id y aqui en addciudad
    // abre y ejecuta este metodo ngOnit que llama al cargar
    // hace el cargar que es el metodo que carga datos a esa pantalla.     
    // Y el cargarPaises trae los paises
    this.cargar();
    this.cargarPaises();
  }

  //============= podemos acceder al valor que tenga cada campo del formulario
  // vamos a poder acceder al valor que tenga el campo codigo
  get id(){
    return this.formularioRegistro.get('id');
  }  

  // vamos a poder acceder al valor que tenga el campo codigo
  get nombre(){
    return this.formularioRegistro.get('nombre');
  }

  // vamos a poder acceder al valor que tenga el campo codigo
  get pais(){
    return this.formularioRegistro.get('pais');
  } 

  // Cargar
  cargar(){
    this.activatedRoute.params.subscribe(
      e => {
        // Capturamos el id que venga en el enlace
        let id = e['id']; 
        console.log("id en cargar", id);  

        // Si id es valido entra y es porque estan editando
        if (id) {
          // marca la vble como false que significa que no es adicion sino que va a editar
          this.isAdd = false;
          //==================================================================================
          // para recuperar varios parametros en un subscribe se hace con subscribe((value) => {
          // separados por punto y coma(;) como lo hacia abajo no funcionaba porque 
          // dentro del subscribe con ( no permite recuperar varios campos
          //==================================================================================     
          this.ciudadService.get(id).subscribe((ciudad) => {
            // console.log("value", value),
              // Con patchValue me permite en estos formularios reactivos asignar cada campo
              this.formularioRegistro.patchValue({id: ciudad.id});
              this.formularioRegistro.patchValue({nombre: ciudad.nombre}); 
              this.formularioRegistro.patchValue({pais: ciudad.pais});
              //this.formularioRegistro.patchValue({pais: ciudad.pais?.nombre});                    
              //this.formularioRegistro.patchValue({pais: ciudad.PaisNombre});                   
          })
          console.log("ciudad entro if", this.ciudad);
    
        }        
      }
    );

  }

  // Traigo los paises y los almaceno en un arreglo this.paises. 
  cargarPaises(){
    console.log("cargarPaises en add-ciudades.ts");   

    this.paisService.getAll().subscribe((listPaises: Pais[]) => {
      this.paises = listPaises;
      console.log("recupero los paises: " , listPaises);      
    }, (error: any) => {
      console.error("Error al recuperar los paises: " , error);
    })
   
  }

  // Cuando se graba aqui tenia un problema porque solo enviaba el id del pais, pero en el back end se definio
  // que debia enviar el objeto pais que contiene id y nombre
  onSubmit(){

    console.log("formulario", this.formularioRegistro.value);
    console.log("formulario valido: " , this.formularioRegistro.valid)    
    console.log("entro a onsubmit")

    // deténgase aquí si el formulario no es válido
    if (this.formularioRegistro.invalid) {
      console.log("entro a invalid form")      
      return;
    }

    // Asignamos cada campo del formulario al modelo o entidad pais
    this.ciudad.id          = this.formularioRegistro.value.id;
    this.ciudad.nombre      = this.formularioRegistro.value.nombre;  
    this.ciudad.pais.id     = this.formularioRegistro.value.pais;

    console.log("listPaises", this.paises)
    console.log("this.formularioRegistro.value.pais", this.formularioRegistro.value.pais) 
    console.log("listPaises2", this.paises.find(pais=> pais.id== this.formularioRegistro.value.pais))

    // Para hallar el nombre del pais, utilizamos esto de javascript con el arreglo this.paises
    // Devuelve el nombre del pais encontrado, al cual se compara con el id con el arreglo pais con el campo pais.id
    // sintaxis javascript
    let nombre = this.paises.find(pais=> pais.id== this.formularioRegistro.value.pais);
    console.log("nombre", nombre)

    // Si nombre es valido lo asigna a ciudad.pais.nombre
    if (nombre) {
      this.ciudad.pais.nombre    = nombre.nombre;
    }
    
    console.log("this.ciudad", this.ciudad)

    // Si esta adicionando inserta sino update
    if (this.isAdd) {
      this.ciudadService.addCiudad(this.ciudad).subscribe(
        res => this.router.navigate(['/ciudades'])
      )
    } else {
      this.ciudadService.update(this.ciudad).subscribe(
        res => this.router.navigate(['ciudades'])
      )
    }

    // Muestra mensaje en pantalla
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.formularioRegistro.value, null, 4)
      //"SUCCESS!!" +JSON.stringify(this.formularioRegistro.value)
    )    

    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.ciudad, null, 4)
      //"SUCCESS!!" +JSON.stringify(this.formularioRegistro.value)
    )      

  }  

}
