import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponenteService } from 'src/app/services/componente.service';
import { Global } from '../../services/global';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { techComponent } from 'src/app/models/techComponent';
import { CargarService } from 'src/app/services/cargar.service';
import { Categoria } from 'src/app/models/categoria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editarcomponent',
  templateUrl: '../createcomponent/createcomponent.component.html',
  styleUrls: ['../createcomponent/createcomponent.component.css'],
  providers:[ComponenteService,CargarService]
})
export class EditarcomponentComponent implements OnInit{
  public titulo:string;
  public componente:techComponent;
  public componenteGuardar:techComponent;
  public url:string;
  public archivosParaCargar:Array<File>;
  @ViewChild('archivoImagen') fileInput:any;
  public status:string;
  public idGuardado:string;
  public categorias:Categoria[];
  public categoriaSeleccionada:string;

  constructor(
    private _componenteService:ComponenteService,
    private _cargarService:CargarService,
    private _route:ActivatedRoute,
  ) { 
    this.titulo="COMPONENTE <<EDICION>>";
    this.url=Global.url;
    this.componente=new techComponent("",[""],"","","",0,"");
    this.componenteGuardar=new techComponent("",[""],"","","",0,"");
    this.status="";
    this.idGuardado="";
    this.archivosParaCargar=[];
    this.categorias = [];
    this.categoriaSeleccionada = "";
  }

  ngOnInit(): void {

    this.getCategorias();
    this._route.params.subscribe(params=>{
      let id=params['id'];
      console.log(id);
      this.getComponent(id);
    })
  }
  guardarComponente(form: NgForm) {
    this._componenteService.updateComponente(this.componente).subscribe(
      response => {
        console.log(response);
        if (response.techComponentsActualizado) {
          if (this.archivosParaCargar.length > 0) {
            this._cargarService.peticionRequest(Global.url + "guardar-imagenes/" + response.componente._id, [], this.archivosParaCargar, 'imagenes')
              .then((result: any) => {
                
                this.componenteGuardar = result.response;
                this.status = 'success';                
                this.idGuardado = result.tech._id;
                
                form.reset();

                if (this.fileInput) {
                  this.fileInput.nativeElement.value = '';
                }
              });
          } else {
            this.status = 'success';  
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


  getComponent(id:String){
    this._componenteService.getComponenteId(id).subscribe(
      response=>{
        this.componente=response.techComponents;
        this.idGuardado = this.componente._id;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


  imagenChangeEvent(archivoSeleccionado: any) {
    this.archivosParaCargar = <Array<File>>archivoSeleccionado.target.files;
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

  actualizarCategoriaSeleccionada() {
    const selectElement = document.querySelector('select');
    if (selectElement) {
      this.categoriaSeleccionada = selectElement.value;
    }
  }
}
