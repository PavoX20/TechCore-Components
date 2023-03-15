import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Registro } from 'src/app/models/registro';
import { sesionValues } from "./sesion";
import { Observable } from 'rxjs';
import { Global } from "./global";




@Injectable()
export class UsuarioService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }


    //Registro
    guardarRegistro(registro:Registro):Observable<any>{
        let params:any={user: registro.usuario, password: registro.password, nombre: registro.nombre, apellido: registro.apellido}
        params=JSON.stringify(params)
        
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'registro-usuario',params,{headers:headers});
    }


    //login

    login(user:string, password:string):Observable<any>{
        let login:any={user: user, password: password}
        let params=JSON.stringify(login)
        
        let headers=new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'login',params,{headers:headers});
    }

}