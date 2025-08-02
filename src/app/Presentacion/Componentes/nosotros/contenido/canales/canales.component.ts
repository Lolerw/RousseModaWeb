import { Component } from '@angular/core';
import { RedesSocialesComponent } from '../redes-sociales/redes-sociales.component';

@Component({
  selector: 'app-canales',
  standalone: true,
  imports: [RedesSocialesComponent],
  templateUrl: './canales.component.html',
  styleUrl: './canales.component.css'
})
export class CanalesComponent {
  // ngAfterViewInit(): void {
  //   const elementos = document.querySelectorAll('.animar-slide-left .animar-slide-right');
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach((entry,index) => {
  //       if (entry.isIntersecting) {
  //         const el = entry.target as HTMLElement;
  //         // el.style.animationDelay = `${index * 2}s`; 
  //         el.classList.add('visible');
  //         observer.unobserve(entry.target); // Solo se anima una vez
  //       }
  //     });
  //   }, {
  //     threshold: 0.1
  //   });

  //   elementos.forEach(el => observer.observe(el));
  // }
}
