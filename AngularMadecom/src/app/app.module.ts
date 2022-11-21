import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { GerenteComponent } from './gerente/gerente.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { CompraCarritoComponent } from './compra-carrito/compra-carrito.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PrefilComponent } from './prefil/prefil.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    GerenteComponent,
    FuncionarioComponent,
    ClienteComponent,
    ProductosComponent,
    LoginComponent,
    CompraCarritoComponent,
    UsuariosComponent,
    PrefilComponent,
    CrearUsuarioComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
