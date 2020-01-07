import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImageFallBack]'
})
export class ImageFallBackDirective {
  @Input() appImgFallBack: string;
  constructor(private eRef: ElementRef) { }

  @HostListener('error')
  loadFallBackOnError() {
    const element: HTMLImageElement = this.eRef.nativeElement as HTMLImageElement;
    element.src = this.appImgFallBack || 'https://i0.wp.com/www.careforkidsnorthdevon.org.uk/wp-content/uploads/2017/09/placeholder.jpg?ssl=1';
  }

}
