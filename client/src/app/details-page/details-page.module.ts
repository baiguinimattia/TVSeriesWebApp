import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPageComponent } from './details-page.component';
import { PosterImageComponent } from './poster-image/poster-image.component';

@NgModule({
  declarations: [DetailsPageComponent, PosterImageComponent],
  imports: [
    CommonModule
  ],
  exports: [DetailsPageComponent]
})
export class DetailsPageModule { }
