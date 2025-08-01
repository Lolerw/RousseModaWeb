import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ENLACES } from '../../../../../config/enlaces.config';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  ubicacionLocal = ENLACES.mapaGoogle;
  localMapa: SafeResourceUrl;
  constructor (private sanitazer:DomSanitizer){
    const embedUrl = this.ubicacionLocal
    this.localMapa = this.sanitazer.bypassSecurityTrustResourceUrl(embedUrl);
  }

}
