import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { CarritoComponent } from './components/carrito/carrito.component';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public cantidad:number;
  constructor(
    private carritoComponent:CarritoComponent
  ) {
    this.cantidad = 0;

  }
  ngOnInit(): void {
    this.cantidad = this.carritoComponent.getCantidadEnCarrito();
  }
}
