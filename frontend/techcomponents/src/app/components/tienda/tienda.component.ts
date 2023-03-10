import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public error:String;
  public statusError:Boolean
  public size:number
  public page!:number
  
  constructor(
    private _componenteService:ComponenteService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.url=Global.url;
    this.techComponent=[];
    this.error="";
    this.statusError=false;
    this.size=0;
   }
  ngOnInit(): void {
    if(this.router.url === '/componentes'){
      this.getComponentes()
    }
    else{
      this._route.params.subscribe(params=>{
        let id = params['idCategoria']
        console.log(id)
        this.getComponentesId(id)
      })
    }
  }

  getComponentesId(id:String){
    this._componenteService.getComponente(id).subscribe(
      response=>{
        if(response.techComponents){
          this.statusError = false
          this.techComponent = response.techComponents
          this.size = this.techComponent.length
          console.log(this.techComponent)
        }
      },
      error=>{
        this.statusError = true
        this.error = error.error
      }
    )
  }

  getComponentes(){
    this._componenteService.getComponentes().subscribe(
      response=>{
        if(response.techComponents){
          this.statusError = false
          this.techComponent = response.techComponents
          this.size = this.techComponent.length
          console.log(this.techComponent)
        }
      },
      error=>{
        this.statusError = true
        this.error = error.error
      }
    )
  }
}
