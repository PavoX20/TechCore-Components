import { Component, OnInit } from '@angular/core';
import { sesionValues } from 'src/app/services/sesion';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  ngOnInit(): void {
    sesionValues.nombre=""
    sesionValues.apellido=""
    sesionValues.usuario=""
  }

}
