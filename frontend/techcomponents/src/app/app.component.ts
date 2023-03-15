import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { CarritoComponent } from './components/carrito/carrito.component';
import { sesionValues } from './services/sesion';
import { Categoria } from './models/categoria';
import { ComponenteService } from './services/componente.service';



@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title="TechCore-Components"
  public cantidad:number;
  public pattern=/^[a-zA-Z]+$/
  public nombreLoged="";
  public categorias:Categoria[];
  constructor(
    private carritoComponent:CarritoComponent,
    private _componenteService:ComponenteService
  ) {
    this.cantidad = 0;
    this.categorias = [];

  }
  ngOnInit(): void {
    this.cantidad = this.carritoComponent.getCantidadEnCarrito();
    this.getCategorias();
  }
  isLoged(){
    this.nombreLoged=sesionValues.nombre
    return this.pattern.test(sesionValues.usuario);
  }
  isAdmin(){
    if(sesionValues.usuario=="pablo"){
      return true
    }else{
      return false
    }
  }

  getCategorias(){
    this._componenteService.getCategorias().subscribe(
      response=>{
        if(response){
          this.categorias = response;
        }
        else{
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
}
