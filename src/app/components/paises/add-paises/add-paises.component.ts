import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from 'src/app/models/pais';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-add-paises',
  templateUrl: './add-paises.component.html',
  styleUrls: ['./add-paises.component.css']
})
export class AddPaisesComponent implements OnInit {

  // Creamos el modelo y abajo le asignamos valores para cuando consuma el api
  pais: Pais = new Pais();

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
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)])
  })  

  // Inyectamos el servicio y mediante el cual nos vamos a conectar al api rest, adicional
  // declaramos router que nos va a permitir navegar entre la aplicación y devolvernos 
  // a la lista de paises, y 
  // ActivatedRoute Proporciona acceso a información sobre una ruta asociada con un componente  
  constructor(private paisService: PaisService, private router: Router, 
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // Cuando presione Editar en la  vista paises.components.html hace routerLink a 
    // esta vista addpais con el parametro pais.id y aqui en addpais
    // abre y ejecuta este metodo ngOnit que llama al cargar
    // hace el cargar que es el metodo que carga datos a esa pantalla.   
    this.cargar();
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

  cargar(): void{
    this.activatedRouter.params.subscribe(
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
          this.paisService.get(id).subscribe((pais) => {
            // console.log("value", value),
              // Con patchValue me permite en estos formularios reactivos asignar cada campo
              this.formularioRegistro.patchValue({id: pais.id});
              this.formularioRegistro.patchValue({nombre: pais.nombre});           
          })
          console.log("pais entro if", this.pais);
    
        }        
      }
    );          
  }

  onSubmit(){

    // deténgase aquí si el formulario no es válido
    if (this.formularioRegistro.invalid) {
      return;
    }

    // Asignamos cada campo del formulario al modelo o entidad pais
    this.pais.id      = this.formularioRegistro.value.id;
    this.pais.nombre  = this.formularioRegistro.value.nombre;
    
    if (this.isAdd) {
      this.paisService.addPais(this.pais).subscribe(
        res => this.router.navigate(['/paises'])
      )
    } else {
      this.paisService.update(this.pais).subscribe(
        res => this.router.navigate(['paises'])
      )
    }

    // Muestra mensaje en pantalla
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.formularioRegistro.value, null, 4)
      //"SUCCESS!!" +JSON.stringify(this.formularioRegistro.value)
    )

  }  


}
