import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EssentialIconsSendComponent } from './components/tienda/essential-icons-send/essential-icons-send.component';
import { MenuItemDefaultComponent } from './components/tienda/menu-item-default/menu-item-default.component';
import { OfertaComponent } from './components/tienda/oferta/oferta.component';
import { SocialIconsStyleWhiteSocia2Component } from './components/tienda/social-icons-style-white-socia2/social-icons-style-white-socia2.component';
import { SocialIconsStyleWhiteSocia3Component } from './components/tienda/social-icons-style-white-socia3/social-icons-style-white-socia3.component';
import { SocialIconsStyleWhiteSocia4Component } from './components/tienda/social-icons-style-white-socia4/social-icons-style-white-socia4.component';
import { SocialIconsStyleWhiteSociaComponent } from './components/tienda/social-icons-style-white-socia/social-icons-style-white-socia.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { TarjetaComponent } from './components/tienda/tarjeta/tarjeta.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponenteService } from './services/componente.service';
import { DetalleComponenteComponent } from './components/detalle-componente/detalle-componente.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { InicioComponent } from './components/inicio/inicio.component';
import { EditarcomponentComponent } from './components/editarcomponent/editarcomponent.component';
import { CreatecomponentComponent } from './components/createcomponent/createcomponent.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuItemDefaultComponent,
    SocialIconsStyleWhiteSociaComponent,
    SocialIconsStyleWhiteSocia2Component,
    SocialIconsStyleWhiteSocia3Component,
    SocialIconsStyleWhiteSocia4Component,
    EssentialIconsSendComponent,
    OfertaComponent,
    TiendaComponent,
    TarjetaComponent,
    DetalleComponenteComponent,
    CarritoComponent,
    InicioComponent,
    EditarcomponentComponent,
    CreatecomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [ComponenteService, CookieService, CarritoComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
