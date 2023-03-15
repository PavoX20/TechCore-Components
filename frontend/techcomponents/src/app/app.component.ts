import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { CarritoComponent } from './components/carrito/carrito.component';
import { sesionValues } from './services/sesion';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title="TechCore-Components"
  public cantidad:number;
  public pattern=/^[a-zA-Z]+$/
  public nombreLoged=""
  constructor(
    private carritoComponent:CarritoComponent
  ) {
    this.cantidad = 0;

  }
  ngOnInit(): void {
    this.cantidad = this.carritoComponent.getCantidadEnCarrito();
  }
  isLoged(){
    this.nombreLoged=sesionValues.nombre
    return this.pattern.test(sesionValues.usuario);
  }
}
