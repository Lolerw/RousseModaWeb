import { Component,AfterViewInit} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { CatalogoExcService, Color } from '../../../Service/Catalogo/catalogo-exc.service';
import { CommonModule } from '@angular/common';
import { Producto, Imagen } from '../../../Service/Catalogo/catalogo-exc.service';
declare var bootstrap: any;
@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements AfterViewInit{
  producto?: Producto;
  imagenes?: Imagen[];
  colores?: Color[];
  id: string | null = null;
  showDescription = false;
  imagenCargando: boolean = true;
  imagenesCargando: boolean = true;
  coloresCargados: boolean = false;
  mainImageUrl: string = '';
  showDetails = false;
  showRefund = false;
  mostrarGuia: boolean = false;
  constructor(private route: ActivatedRoute,private catalogoService: CatalogoExcService) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("id del producto:"+this.id)
  }
  Showdescription() {
    this.showDescription = !this.showDescription;
  }
  Showdetails() {
    this.showDetails = !this.showDetails;
  }
  Showrefund() {
    this.showRefund = !this.showRefund;
  }
  cambiarImagen(url: string, index: number): void {
  this.mainImageUrl = url;

  const carouselElement = document.getElementById('carouselIMG2');
  if (carouselElement) {
    // @ts-ignore
    const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement);
    carousel.to(index + 1);
  }
}
  cerrarModal(event: MouseEvent) {
    this.mostrarGuia = false;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.catalogoService.getProductoPorId(id).subscribe(prod => {
        if (prod) {
          this.producto = prod;
          this.mainImageUrl = this.producto.imagen;
          
          console.log('Producto encontrado:', this.producto);
          this.imagenCargando=false;
          this.catalogoService.getColoresPorIds(this.producto.IdColores).subscribe(data => {
            this.colores = data;
            console.log('Colores cargados:', this.colores); 
            this.coloresCargados=true;
          });
        } else {
          console.error('Producto no encontrado');
        }
      });
      
      this.catalogoService.getImagenesPorId(id).subscribe(data => {
        this.imagenes = data;
        
        console.log('Datos cargados:', this.imagenes); 
        this.imagenesCargando=false;
      });
      
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = document.getElementById('carouselIMG');
      if (el) {
        const carousel = bootstrap.Carousel.getOrCreateInstance(el);
        carousel.pause(); 
        carousel.cycle(); 
      }
    }, 0); 
  }
}
