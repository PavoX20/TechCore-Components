import { Component, OnInit } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router} from '@angular/router';
import { techComponent } from 'src/app/models/techComponent';


@Component({
  selector: 'app-detalle-componente',
  templateUrl: './detalle-componente.component.html',
  styleUrls: ['./detalle-componente.component.css'],
  providers:[ComponenteService]
})
export class DetalleComponenteComponent implements OnInit{


  
  public url:string;
  public componente:techComponent;
  public confirm:boolean;
  public imagenID:string;
  public imagenSeleccionada:string;
  public imagenes:NodeListOf<HTMLAnchorElement>;

  constructor(
    private _componenteService:ComponenteService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.componente=new techComponent("",[""],"","","",0,"");
    this.confirm=false;
    this.imagenID="";
    this.imagenSeleccionada="";
    this.imagenes = document.querySelectorAll<HTMLAnchorElement>('.imge');
  }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      //let id=params['id'];
      //console.log(id);
      let id = "6407eee5ae428b26cc5a1c56";
      this.getPelicula(id);

      
    })
  }

  getPelicula(id:String){
    this._componenteService.getComponente(id).subscribe(
      response=>{
        this.componente=response.techComponents;
        this.setImagen(this.componente.imagenes[0])
      },
      error=>{
        console.log(<any>error);
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

}

