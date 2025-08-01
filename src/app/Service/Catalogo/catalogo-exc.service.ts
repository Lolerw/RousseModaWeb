import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import * as Papa from 'papaparse';

export interface Producto {
  id: string;
  Nombre: string;
  Descripcion: string;
  precio: number;
  imagen: string;
  IdColores: string;
}
export interface Imagen {
  id: string;
  id_modelo: string;
  URL: string;
}
export interface Color {
  id: string;
  nombre: string;
  hexadecimal: string;
}
@Injectable({
  providedIn: 'root'
})
export class CatalogoExcService {
  private Hoja_Calzado = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTh-6cV-QsbcaQGjtRuutgWpXGgCfUiV8BBdegKcXex2t9i-A6PxNIwhpSZKtApWsKyymUhX8yL2AAP/pub?gid=966381548&single=true&output=csv';
  private Hoja_Imagenes = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTh-6cV-QsbcaQGjtRuutgWpXGgCfUiV8BBdegKcXex2t9i-A6PxNIwhpSZKtApWsKyymUhX8yL2AAP/pub?gid=65876799&single=true&output=csv';
  private Hoja_Colores = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTh-6cV-QsbcaQGjtRuutgWpXGgCfUiV8BBdegKcXex2t9i-A6PxNIwhpSZKtApWsKyymUhX8yL2AAP/pub?gid=0&single=true&output=csv';
  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get(this.Hoja_Calzado, { responseType: 'text' }).pipe(
      tap(csv => console.log('CSV recibido:', csv)),
      map(csv => {
        const parsed = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true
        });

        return parsed.data.map((row: any) => ({
          id: row['IdModelo'],
          Nombre: row['Nombre'],
          precio: parseFloat(row['Precio'].replace(',', '.')),
          imagen: row['Imagen']
        })) as Producto[];
      })
    );
  }
  getProductoPorId(idBuscado: string): Observable<Producto | undefined> {
    return new Observable(observer => {
      this.http.get(this.Hoja_Calzado, { responseType: 'text' }).subscribe(csv => {
        let productoEncontrado: Producto | undefined = undefined;

        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          step: (row: any) => {
            const data = row.data;
            if (data['IdModelo'] === idBuscado) {
              productoEncontrado = {
                id: data['IdModelo'],
                Nombre: data['Nombre'],
                Descripcion:  data['Descripcion'],
                precio: parseFloat(data['Precio'].replace(',', '.')),
                imagen: data['Imagen'],
                IdColores:data['IdColores'],
              };
              observer.next(productoEncontrado);
              observer.complete();
            }
          },
          complete: () => {
            if (!productoEncontrado) {
              observer.next(undefined);
              observer.complete();
            }
          },
          error: (err: any) => observer.error(err)
        });
      }, err => observer.error(err));
    });
  }
  getImagenesPorId(idBuscado: string): Observable<Imagen[]> {
    return new Observable<Imagen[]>(observer => {
      const imagenes: Imagen[] = [];
      let contador = 0;

      this.http.get(this.Hoja_Imagenes, { responseType: 'text' }).subscribe({
        next: csv => {
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            step: (row: any, parser: any) => {
              const data = row.data;

              if (data['IdModelo'] === idBuscado) {
                imagenes.push({
                  id: data['IdImagen'],
                  id_modelo: data['IdModelo'],
                  URL: data['URL']
                });

                contador++;
                if (contador === 4) {
                  parser.abort();
                  observer.next(imagenes);
                  observer.complete();
                }
              }
            },
            complete: () => {
              if (contador < 4) {
                observer.next(imagenes);
                observer.complete();
              }
            },
            error: (err: any) => {
              console.error('Error al parsear CSV:', err);
              observer.error(err);
            }
          });
        },
        error: err => {
          console.error('Error al obtener CSV:', err);
          observer.error(err);
        }
      });
    });
  }
  getColoresPorIds(idsString: string): Observable<Color[]> {
    const idsBuscados = new Set(idsString.split('-')); 
    const coloresEncontrados: Color[] = [];

    return new Observable(observer => {
      this.http.get(this.Hoja_Colores, { responseType: 'text' }).subscribe(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          step: (row: any) => {
            const data = row.data;
            if (idsBuscados.has(data['IdColor'])) {
              coloresEncontrados.push({
                id: data['IdColor'],
                nombre: data['Nombre'],
                hexadecimal: data['Hexadecimal']
              });
            }
          },
          complete: () => {
            observer.next(coloresEncontrados);
            observer.complete();
          },
          error: (err: any) => observer.error(err)
        });
      }, err => observer.error(err));
    });
  }

}
