import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  // definimos la vble ciudades que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros y adicional tambien se va a utilizar para ordenar como esto es un model cliente
  // ahi trae todas los clientes.
  clientes: Cliente[] = [];    

  constructor() { }

  ngOnInit(): void {
  }

}
