import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { DetalleComponenteComponent } from './components/detalle-componente/detalle-componente.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { EditarcomponentComponent } from './components/editarcomponent/editarcomponent.component';
import { CreatecomponentComponent } from './components/createcomponent/createcomponent.component';
const routes: Routes = [
  {path:'home',component:InicioComponent},
  {path:'componentes/:idCategoria',component:TiendaComponent},
  {path:'componentes',component:TiendaComponent},
  {path:'registro',component:RegistroComponent},
  {path:'login',component:LoginComponent},
  {path:'detalle-componente/:id',component:DetalleComponenteComponent},
  {path:'carrito',component:CarritoComponent},
  {path:'guardar/:id',component:CreatecomponentComponent},
  {path:'editar/:id',component:EditarcomponentComponent},
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
