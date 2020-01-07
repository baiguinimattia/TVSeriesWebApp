import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFallBackDirective } from './image-fall-back.directive';

@NgModule({
  declarations: [ImageFallBackDirective],
  imports: [
    CommonModule
  ],
  exports: [ImageFallBackDirective],
})
export class DirectivesModule { }
