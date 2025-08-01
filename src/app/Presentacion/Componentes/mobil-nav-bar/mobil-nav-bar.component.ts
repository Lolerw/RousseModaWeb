import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-mobil-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './mobil-nav-bar.component.html',
  styleUrl: './mobil-nav-bar.component.css'
})
export class MobilNavBarComponent {

}
