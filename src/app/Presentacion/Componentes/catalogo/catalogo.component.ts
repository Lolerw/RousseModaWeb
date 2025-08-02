import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CatalogoExcService,Producto } from '../../../Service/Catalogo/catalogo-exc.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit{
  productos: Producto[] = [];
  producto_clickeado?: Producto;
  productosPagina: Producto[] = []; 
  paginaActual: number = 1;
  porPagina: number = 16;
  constructor(private ExcService: CatalogoExcService) {}

  get totalPaginas(): number {
  return Math.ceil(this.productos.length / this.porPagina);
  }
  ngOnInit(): void {
    this.ExcService.getProductos().subscribe(data => {
      this.productos = data;
      //console.log('Datos cargados:', this.productos); 
      this.actualizarPagina();
    });
  }
  actualizarPagina() {
  const inicio = (this.paginaActual - 1) * this.porPagina;
  const fin = inicio + this.porPagina;
  this.productosPagina = this.productos.slice(inicio, fin);
  }
  irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.actualizarPagina();
    }
  }
  
}
