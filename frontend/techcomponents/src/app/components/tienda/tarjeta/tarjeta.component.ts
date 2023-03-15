import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit{
  @Input() item: any
  public url:string;
  constructor(){
    this.url=Global.url;
  }
  ngOnInit(): void {
    
  }

}
