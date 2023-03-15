import { Component } from '@angular/core';
import { Registro } from 'src/app/models/registro';
import { ComponenteService } from 'src/app/services/componente.service';
import { Global } from 'src/app/services/global';
import { sesionValues } from 'src/app/services/sesion';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers:[ComponenteService, UsuarioService],

})
export class RegistroComponent {
  public reg: Registro;

  constructor(
    private _usuarioservice: UsuarioService 
    //por completar
  ){
    this.reg = new Registro("", "", "", "")
  }
  ngOnInit(): void {
  }
  guardarRegistro(){
    
    this._usuarioservice.guardarRegistro(this.reg).subscribe({
      next: response=>{
        console.log(response.flag)
        if(response.flag){
          alert(response.message)
          
        }else{
          alert(response.message)
        }
      },
      error: error => alert("Se ha generado un "+error),
      complete:()=>console.log("Complete")
    })
  }

}
