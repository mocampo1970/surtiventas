import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCiudadesComponent } from './components/ciudades/add-ciudades/add-ciudades.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AddPaisesComponent } from './components/paises/add-paises/add-paises.component';
import { PaisesComponent } from './components/paises/paises.component';
import { AddPedidosComponent } from './components/pedidos/add-pedidos/add-pedidos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AddProductosComponent } from './components/productos/add-productos/add-productos.component';
import { ProductosComponent } from './components/productos/productos.component';

/* Creamos las rutas de navegación de la aplicación*/
const routes: Routes = [
   // Esto significa cuando en la url tenga login vaya abra el componente login y asi con los demas
  // la de usuario/:id es para nevegar segun un indice dependiendo de la persona abra datos como una
  // ventana response.
  //
  // Nota: No me abria cuando entrada a las categorias
  //       daba click en list products porque lo tenia listproducts sin el -
  {path: 'paises', component: PaisesComponent},
  {path: 'ciudades', component: CiudadesComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'add-productos', component: AddProductosComponent},
  {path: 'add-productos/:id', component: AddProductosComponent},  // Se va utilizar para update 1 prod
  {path: 'add-paises', component: AddPaisesComponent},
  {path: 'add-paises/:id', component: AddPaisesComponent},  // Se va utilizar para update 1 pais
  {path: 'add-ciudades', component: AddCiudadesComponent},
  {path: 'add-ciudades/:id', component: AddCiudadesComponent},  // Se va utilizar para update 1 ciudad 
  {path: 'pedidos', component: PedidosComponent},
  {path: 'add-pedidos', component: AddPedidosComponent},
  {path: 'add-ciudades/:id', component: AddCiudadesComponent},  // Se va utilizar para update 1 ciudad  
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }