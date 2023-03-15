import { Component, OnInit } from '@angular/core';
import { sesionValues } from 'src/app/services/sesion';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
  
})
export class LoginComponent implements OnInit{
    public password:string
    public user:string
  constructor(
    private _usuarioservice:UsuarioService
  ){
    this.password=""
    this.user=""
  }
  ngOnInit(): void {
    
  }

  login(){
    
    this._usuarioservice.login(this.user, this.password).subscribe({
      next: response => {
        if(response.flag){
          alert(response.message)
          sesionValues.nombre=response.response.nombre
          sesionValues.apellido=response.response.apellido

          
          alert("Usuario: "+ sesionValues.nombre+" "+sesionValues.apellido)
        }else{
          alert("Se ha producido un error: "+response.message)
        }
      },
      error: error => alert("Se ha generado un error: "+error),
      complete: () => console.info('complete') 
  })
  }


}
