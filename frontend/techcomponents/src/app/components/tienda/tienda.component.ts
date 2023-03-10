import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { techComponent } from 'src/app/models/techComponent';
import { ComponenteService } from 'src/app/services/componente.service';
import { Global } from 'src/app/services/global';
import { CarritoComponent } from '../carrito/carrito.component';

/* @figmaId 67:293 */
@Component({
  selector: 'ng-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  public techComponent:techComponent[];
  public url:string;
  public cantidadEnCarrito: number;
  constructor(
    private _componenteService:ComponenteService,
    private carrito: CarritoComponent
  ) {
    this.url=Global.url;
    this.techComponent=[];
    this.cantidadEnCarrito = 0;
   }
  ngOnInit(): void {
    this.getComponentes();
    this.cantidadEnCarrito = this.carrito.getCantidadEnCarrito();
    console.log(this.cantidadEnCarrito);
  }

  getComponentes(){
    this._componenteService.getComponentes().subscribe(
      response=>{
        if(response.techComponents){
          this.techComponent = response.techComponents
          console.log(this.techComponent)
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
