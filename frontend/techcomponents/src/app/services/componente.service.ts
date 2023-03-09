import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { techComponent } from "../models/techComponent"; 
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
    //http://localhost:3700/peliculas
    getComponente(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'componente/'+id,{headers:headers});
    }

}