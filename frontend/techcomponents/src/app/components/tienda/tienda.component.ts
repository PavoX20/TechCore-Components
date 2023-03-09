import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Componente } from 'src/app/models/componente';
import { ComponenteService } from 'src/app/services/componente.service';
import { Global } from 'src/app/services/global';

/* @figmaId 67:293 */
@Component({
  selector: 'ng-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  public componentes:Componente[];
  public url:string;
  constructor(
    private _componenteService:ComponenteService
  ) {
    this.url=Global.url;
    this.componentes=[];
   }
  ngOnInit(): void {
    this.getComponentes()
  }

  getComponentes(){
    this._componenteService.getComponentes().subscribe(
      response=>{
        if(response.techComponents){
          this.componentes = response.techComponents
          console.log(this.componentes)
        }
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

}
