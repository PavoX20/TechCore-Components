import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class ComponenteService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    //ver todas las peliculas
    //http://localhost:3700/componentes/:idCategoria
    getComponenteId(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'componentes/:'+id,{headers:headers});
    }
    //http://localhost:3700/componentes
    getComponentes():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'componentes',{headers:headers});
    }
}