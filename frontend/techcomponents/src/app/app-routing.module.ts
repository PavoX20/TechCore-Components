import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleComponenteComponent } from './components/detalle-componente/detalle-componente.component';

const routes: Routes = [
  {path: 'detalle-componente',component: DetalleComponenteComponent},
  {path: 'registro',component: RegistroComponent},
  {path: '**',component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
