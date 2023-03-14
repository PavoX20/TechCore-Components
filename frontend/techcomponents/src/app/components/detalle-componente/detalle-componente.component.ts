import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router} from '@angular/router';
import { techComponent } from 'src/app/models/techComponent';
import { TarjetaComponent } from '../tienda/tarjeta/tarjeta.component';
import { CarritoComponent } from '../carrito/carrito.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detalle-componente',
  templateUrl: './detalle-componente.component.html',
  styleUrls: ['./detalle-componente.component.css'],
  providers:[ComponenteService]
})
export class DetalleComponenteComponent implements OnInit{

  @ViewChild(TarjetaComponent) appTarjeta: TarjetaComponent;
  public techComponent:techComponent[];
  public url:string;
  public componente:techComponent;
  public confirm:boolean;
  public imagenID:string;
  public imagenSeleccionada:string;
  public imagenes:NodeListOf<HTMLAnchorElement>;
  public carrito: CarritoComponent
  constructor(
    private _componenteService:ComponenteService,
    private _router:Router,
    private _route:ActivatedRoute,
    private cookie: CookieService
  ) { 
    this.url=Global.url;
    this.componente=new techComponent("",[""],"","","",0,"");
    this.carrito = new CarritoComponent(_componenteService, cookie, _route, _router)
    this.confirm=false;
    this.imagenID="";
    this.imagenSeleccionada="";
    this.imagenes = document.querySelectorAll<HTMLAnchorElement>('.imge');
    this.techComponent=[];
    this.appTarjeta = new TarjetaComponent;
  }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this.getComponentes();
      this.getComponent(id);
      
    })
  }

  getComponent(id:String){
    this._componenteService.getComponenteId(id).subscribe(
      response=>{
        this.componente=response.techComponents;
        this.setImagen(this.componente.imagenes[0])
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  getComponentes(){
    console.log("asgdjklsdfjkl");
    this._componenteService.getComponentes().subscribe(
      response=>{
        if(response.techComponents){
          this.techComponent = response.techComponents;
          console.log(this.techComponent);
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  setImagen(imagen:string, event?: MouseEvent){
    this.imagenID=imagen;
    if (event) {
      event.preventDefault();
    }
    console.log(this.imagenID);
  
    this.imagenSeleccionada = imagen;
  
    this.imagenes = document.querySelectorAll('.imge');
    for (let i = 0; i < this.imagenes.length; i++) {
      const img = this.imagenes[i].querySelector('img');
      if (img && img.src.endsWith(imagen)) {
        this.imagenes[i].classList.add('selected');
      } else {
        this.imagenes[i].classList.remove('selected');
      }
    }
  }

  agregarCarrito(producto:techComponent): void{
    this.carrito.agregarAlCarrito(producto)
    location.reload()
  }

}

