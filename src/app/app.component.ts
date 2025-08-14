import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CatalogoComponent } from './Presentacion/Componentes/catalogo/catalogo.component';
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './Presentacion/Componentes/navbar/navbar.component';
import { MobilNavBarComponent } from './Presentacion/Componentes/mobil-nav-bar/mobil-nav-bar.component';
import { FooterComponent } from './Presentacion/Componentes/footer/footer.component';
import { PoliticasComponent } from './Presentacion/Componentes/politicas/politicas.component';
import { BotonWspComponent } from './Presentacion/Componentes/boton-wsp/boton-wsp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CatalogoComponent, HomeComponent, NavbarComponent, MobilNavBarComponent,FooterComponent, PoliticasComponent,BotonWspComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RousseModaWeb';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Esperamos a que el DOM cargue completamente antes de hacer scroll
        setTimeout(() => {
          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            this.viewportScroller.scrollToAnchor(fragment);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100); // el timeout asegura que el DOM se haya renderizado
      });
  }
}
