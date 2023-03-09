import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { techComponent } from 'src/app/models/techComponent';
import { ComponenteService } from 'src/app/services/componente.service';
import { Global } from 'src/app/services/global';

/* @figmaId 67:293 */
@Component({
  selector: 'ng-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  public techComponent:techComponent[];
  public url:string;
  constructor(
    private _componenteService:ComponenteService
  ) {
    this.url=Global.url;
    this.techComponent=[];
   }
  ngOnInit(): void {
    this.getComponentes()
  }

  getComponentes(){
    this._componenteService.getComponente('640982645693476b531502ac').subscribe(
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
