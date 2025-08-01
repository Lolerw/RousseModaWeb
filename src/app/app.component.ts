import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CatalogoComponent } from './Presentacion/Componentes/catalogo/catalogo.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './Presentacion/Componentes/navbar/navbar.component';
import { MobilNavBarComponent } from './Presentacion/Componentes/mobil-nav-bar/mobil-nav-bar.component';
import { FooterComponent } from './Presentacion/Componentes/footer/footer.component';
import { PoliticasComponent } from './Presentacion/Componentes/politicas/politicas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CatalogoComponent, HomeComponent, NavbarComponent, MobilNavBarComponent,FooterComponent, PoliticasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RousseModaWeb';
}
