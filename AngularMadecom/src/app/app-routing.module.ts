import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { GerenteComponent } from './gerente/gerente.component';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PrefilComponent } from './prefil/prefil.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:"",component:PaginaInicialComponent},
  {path:"cliente",component:ClienteComponent},
  {path:"gerente",component:GerenteComponent},
  {path:"funcionario",component:FuncionarioComponent},
  {path:"login",component:LoginComponent},
  {path:"productos",component:ProductosComponent},
  {path:"usuarios",component:UsuariosComponent},
  {path:"prefil",component:PrefilComponent},
  {path:"crear-usuario",component:CrearUsuarioComponent},
  {path:"carrito",component:CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
