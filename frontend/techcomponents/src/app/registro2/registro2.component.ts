import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro2',
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.css'],
  providers: [UsuarioService]
})
export class Registro2Component implements OnInit{
  public nombre:string=""
  public apellido:string=""
  public usuario:string=""
  public password:string=""
  constructor(
    private _usuarioservice: UsuarioService
    //por completar
  ){
    
  }
  ngOnInit(): void {
  }
  guardarRegistro(){
    
    this._usuarioservice.guardarRegistro({nombre:this.nombre, apellido:this.apellido, user:this.usuario, password:this.password}).subscribe({
      next: response=>{
        console.log(response.flag)
        if(response.flag){
          alert("Se ha creado con éxito la cuenta")
          
        }else{
          alert(response.message)
        }
      },
      error: error => alert("Se ha generado un "+error),
      complete:()=>console.log("Complete")
    })
  }
}
