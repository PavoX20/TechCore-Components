import { Component, OnInit  } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Global } from '../../services/global';
import { ComponenteService } from 'src/app/services/componente.service';
import { techComponent } from 'src/app/models/techComponent';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public url:string;
  public componente:techComponent;
  public cantidadEnCarrito: number = 0;
  public productosEnCarrito: any[] = [];
  public total:number =0;
  public modoEdicion:boolean =false;
  public opcionSeleccionada:string;
  

  constructor(
    private _componenteService:ComponenteService,
    private cookieService: CookieService,
    private _route:ActivatedRoute
  ) {
    this.url=Global.url;
    this.componente=new techComponent("",[""],"","","",0,"");
    const carritoCookie = this.cookieService.get('carrito');
    if (carritoCookie) {
      this.productosEnCarrito = JSON.parse(carritoCookie);
    }
    this.opcionSeleccionada = "";
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      // let id=params['id'];
      // console.log(id);
      
      //this.getComponent(id);
      this.actualizarTotal();
    })
  }
  //traer el producto de la base de datos y mandarlo al carrito
  getComponent(id:String){
    this._componenteService.getComponenteId(id).subscribe(
      response=>{
        this.componente=response.techComponents;
        this.agregarAlCarrito(this.componente);
        this.cantidadEnCarrito = this.getCantidadEnCarrito();
        console.log(this.cantidadEnCarrito);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  //agregamos al carrito el producto
  agregarAlCarrito(producto: techComponent) {
    const productoEnCarrito = {
      id: producto._id,
      imagenes: producto.imagenes,
      nombre: producto.nombre,
      titulo: producto.titulo,
      detalle: producto.detalle,
      precio: producto.precio,
      cantidad: 1,
    };

    // Obtener el arreglo de productos en el carrito almacenado en la cookie
    let carrito: any[] = [];
    const carritoCookie = this.cookieService.get('carrito');
    if (carritoCookie) {
      // Si la cookie ya existe, convertir el contenido a un arreglo
      carrito = JSON.parse(carritoCookie);
    } 
    else {
      // Si la cookie no existe, inicializar el arreglo vacío
      carrito = [];
    }

    // Agregar el producto al arreglo
    carrito.push(productoEnCarrito);

    // Guardar el arreglo de productos en la cookie
    this.cookieService.set('carrito', JSON.stringify(carrito));
  }

  vaciarCarrito() {
    this.cookieService.delete('carrito');
    location.reload();
  }

  eliminarDelCarrito(producto:any[]) {
    const index = this.productosEnCarrito.indexOf(producto);
    if (index !== -1) {
      this.productosEnCarrito.splice(index, 1);
      this.cookieService.set('carrito', JSON.stringify(this.productosEnCarrito));
    }
    location.reload();
  }

  //calcular cuando se debe
  actualizarTotal() {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total +=  producto.precio;
    }
    this.total = total;
  }

  getCantidadEnCarrito() {
    const carritoCookie = this.cookieService.get('carrito');
    if (carritoCookie) {
      const carrito = JSON.parse(carritoCookie);
      return carrito.length;
    } else {
      return 0;
    }
  }

  alternarModoEdicion() {
    this.modoEdicion = !this.modoEdicion;
  }

}
