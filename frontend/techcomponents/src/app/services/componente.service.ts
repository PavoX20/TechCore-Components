import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Observable } from 'rxjs';
import { techComponent } from "../models/techComponent";

@Injectable()
export class ComponenteService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    //ver todas las Componentes
    //http://localhost:3700/componentes/:idCategoria
    getComponente(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'componentes/'+id,{headers:headers});
    }
    //http://localhost:3700/componentes
    getComponentes():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'componentes',{headers:headers});
    }
    //http://localhost:3700/componente/:id
    getComponenteId(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'componente/'+id,{headers:headers});
    }
    //http://localhost:3700/guardar-componente
    guardarComponentes(componente:techComponent):Observable<any>{
        let params=JSON.stringify(componente);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardar-componente',params,{headers:headers});
    }

    //editar Componente
    //http://localhost:3700/componente/:id
    updateComponente(Componente:techComponent):Observable<any>{
        let params=JSON.stringify(Componente);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'componente/'+Componente._id,params,{headers:headers});
    }


    //eliminar componentez
    //http://localhost:3700/componente/:id
    deleteComponente(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'componente/'+id,{headers:headers});
    }


    //http://localhost:3700/get-categorias
    getCategorias():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'get-categorias',{headers:headers});
    }

}