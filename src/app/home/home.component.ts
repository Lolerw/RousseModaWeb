import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngAfterViewInit(): void {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry,index) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.animationDelay = `${index * 0.3}s`;
            entry.target.classList.add('visible');
            observer.unobserve(el);
          }
        });
      }, {
        threshold: 0.25
      });

      const elementos = document.querySelectorAll('.observar');
      elementos.forEach(el => observer.observe(el));
    }
}
