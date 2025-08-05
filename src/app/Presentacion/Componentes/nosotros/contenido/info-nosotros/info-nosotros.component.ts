import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-info-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './info-nosotros.component.html',
  styleUrl: './info-nosotros.component.css'
})
export class InfoNosotrosComponent implements AfterViewInit{
  // videLocalNosotos = '/assets/VID_PASARELA.mp4'
  videos: string[] =[
    'assets/videos/VID_1.MOV',
    'assets/videos/VID_2.MOV',
    'assets/videos/VID_3.MOV',
    'assets/videos/VID_4.MOV',
    'assets/videos/VID_5.MOV'
  ];
  currentIndex = 0;
  isVideo1Visible = true;

  @ViewChild('video1', { static: false }) video1Ref!: ElementRef<HTMLVideoElement>;
  @ViewChild('video2', { static: false }) video2Ref!: ElementRef<HTMLVideoElement>;

 ngAfterViewInit(): void {
    const video = this.video1Ref.nativeElement;
    video.src = this.videos[this.currentIndex];
    video.load();

    video.onloadeddata = () => {
      video.play();
    };
  }

  onVideoEnded(): void {
    const nextIndex = (this.currentIndex + 1) % this.videos.length;
    const currentVideo = this.isVideo1Visible ? this.video1Ref.nativeElement : this.video2Ref.nativeElement;
    const nextVideo = this.isVideo1Visible ? this.video2Ref.nativeElement : this.video1Ref.nativeElement;

    // Actualiza el índice antes de cargar
    this.currentIndex = nextIndex;

    // Carga el nuevo video en el video oculto
    nextVideo.src = this.videos[this.currentIndex];
    nextVideo.load();

    nextVideo.onloadeddata = () => {
      nextVideo.play();
      // Espera un frame para activar el cambio de visibilidad (evita parpadeo)
      requestAnimationFrame(() => {
        this.isVideo1Visible = !this.isVideo1Visible;
      });
    };
  }

  get video1Class(): string {
    return this.isVideo1Visible ? 'video-visible' : '';
  }

  get video2Class(): string {
    return !this.isVideo1Visible ? 'video-visible' : '';
  }
}
