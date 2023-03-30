import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Services
import { TranslateService } from './services/translate.service';
import { ConfigService } from './services/config.service';

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PaisesComponent } from './components/paises/paises.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AddProductosComponent } from './components/productos/add-productos/add-productos.component';
import { FilterproductoPipe } from './pipes/filterproducto.pipe';
import { SortDirective } from './directives/sort.directive';
import { AddPaisesComponent } from './components/paises/add-paises/add-paises.component';
import { AddCiudadesComponent } from './components/ciudades/add-ciudades/add-ciudades.component';
import { FilterpaisPipe } from './pipes/filterpais.pipe';
import { FilterciudadPipe } from './pipes/filterciudad.pipe';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AddPedidosComponent } from './components/pedidos/add-pedidos/add-pedidos.component';

// Creamos funcion de translate y abajo de config
// esta de translate me va a ayudar a traduccir
export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

// Funcion de config
// esta funcion me va a ayudar a configurar
export function configFactory(provider: ConfigService) {
  return () => provider.getData();
}

// Nota: cuando uno crea un componente dentro de la carpeta shared que es como una carpeta compartida, 
//       que esta arriba, los componentes que se creen alla no se crean aqui. aqui solo se 
//       crean el resto de componentes que no se crearon dentro de esa carpeta. si creamos cualquier
//       componente fuera de ese shared si lo coloca aqui, obviamente como todos los que he hecho.
//       aqui solo se crean el resto de componentes que estan por fuera del shared y tambien 
//       solo el shared de esa carpeta.
//       
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    TranslatePipe,
    ClientesComponent,
    PaisesComponent,
    CiudadesComponent,
    ProductosComponent,
    AddProductosComponent,
    FilterproductoPipe,
    SortDirective,
    AddPaisesComponent,
    AddCiudadesComponent,
    FilterpaisPipe,
    FilterciudadPipe,
    PedidosComponent,
    AddPedidosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
