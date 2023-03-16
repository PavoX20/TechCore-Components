import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComponenteService } from 'src/app/services/componente.service';
import { CargarService } from '../../services/cargar.service';
import { techComponent } from 'src/app/models/techComponent';
import { Global } from '../../services/global';
import { Categoria } from 'src/app/models/categoria';
@Component({
  selector: 'app-createcomponente',
  templateUrl: './createcomponent.component.html',
  styleUrls: ['./createcomponent.component.css'],
  providers:[ComponenteService,CargarService]
})
export class CreatecomponentComponent implements OnInit {
  public titulo:string;
  public componente:techComponent;
  public componenteGuardar:techComponent;
  public url:string;
  public archivosParaCargar:Array<File>;
  @ViewChild('archivoImagen') fileInput:any;
  public status:string = "";
  public idGuardado:string;
  public categorias:Categoria[];
  public categoriaSeleccionada:string;

  constructor(
    private _componenteService:ComponenteService,
    private _cargarService:CargarService
  ) { 
    this.titulo="COMPONENTE <<GUARDADO>>";
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
    console.log(this.titulo);
  }
  guardarComponente(form: NgForm) {
    this._componenteService.guardarComponentes(this.componente).subscribe(
      response => {
        if (response.componente) {
          if (this.archivosParaCargar.length > 0) {
            this._cargarService.peticionRequest(Global.url + "guardar-imagenes/" + response.componente._id, [], this.archivosParaCargar, 'imagenes')
              .then((result: any) => {
                this.componenteGuardar = result.response;
                this.status = 'success';                
                this.idGuardado = result.tech._id;
                console.log(result)
                form.reset();

                if (this.fileInput) {
                  this.fileInput.nativeElement.value = '';
                }
              });
          } else {
            this.status = 'failed';
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
