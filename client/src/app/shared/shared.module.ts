import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { AlertModule } from './header/alert/alert.module';
import { CarouselComponent } from './carousel/carousel.component';
import { NguCarouselModule } from '@ngu/carousel';
import { RecentComponent } from './recent/recent.component';

@NgModule({
  declarations: [CarouselComponent, RecentComponent],
  imports: [
    CommonModule,
    HeaderModule,
    AlertModule,
    NguCarouselModule
  ],
  exports: [
    HeaderModule,
    AlertModule,
    CarouselComponent
  ]
})
export class SharedModule { }
