import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPageComponent } from './details-page.component';
import { PosterImageComponent } from './poster-image/poster-image.component';
import { ClarityModule } from '@clr/angular';
import { BannerComponent } from './banner/banner.component';
import { IntroComponent } from './intro/intro.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [DetailsPageComponent, PosterImageComponent, BannerComponent, IntroComponent, DataTableComponent],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [DetailsPageComponent]
})
export class DetailsPageModule { }
