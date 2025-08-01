import { Component, OnInit } from '@angular/core';
import { ENLACES } from '../../../config/enlaces.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CanalesComponent } from './contenido/canales/canales.component';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { MapaComponent } from './contenido/mapa/mapa.component';
import { InfoNosotrosComponent } from './contenido/info-nosotros/info-nosotros.component';
@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CanalesComponent,MapaComponent,InfoNosotrosComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent implements OnInit {
  idNosotros = ENLACES.idVideoNosotrosYT;
  videLocalNosotos = '/assets/VIDEO_PRUEBA.mp4'
  videoNosotros: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ){
    const id = this.idNosotros;
    const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;
    this.videoNosotros = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100); // Ajustable según tu renderizado
      }
    });
  }
}
