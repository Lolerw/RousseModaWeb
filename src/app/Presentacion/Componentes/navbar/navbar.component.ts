import { CommonModule } from '@angular/common';
import { Component, inject, signal,computed, effect } from '@angular/core';
import { Router,RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private router = inject(Router);
  currentUrl = signal(this.router.url);
  rutaEsInicio = true;
  isHovered = false;
  scrollActivo = signal(false);
  imagenActual = 'assets/logo.png';
  scrollToSeccion(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  changeTo(tipo: 'normal' | 'hover') {
    this.isHovered = tipo === 'hover';

    if(this.isHovered){
      this.imagenActual = this.rutaEsInicio
      ? '/assets/logo_og.png'
      : '/assets/logo_og.png';
    } else{
      this.setImagenPorRuta();
    }
  }
  constructor() 
  {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.rutaEsInicio = event.urlAfterRedirects === '/home';
        this.setImagenPorRuta();
      });

    this.setImagenPorRuta();

    // detectar scroll
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset;
        this.scrollActivo.set(scrollY > 50); // Activar si se ha bajado 50px
        this.setImagenPorRuta(); // también actualizar el logo
      });
    }
  }

  setImagenPorRuta() {
  const esDesktop = typeof window !== 'undefined' && window.innerWidth > 250;
  if ((this.isHovered || this.scrollActivo()) && esDesktop) {
    this.imagenActual = '/assets/logo_og.png';
  } else {
    this.imagenActual = this.rutaEsInicio
      ? '/assets/logo.png'
      : '/assets/logo_og.png';
  }
}

}
