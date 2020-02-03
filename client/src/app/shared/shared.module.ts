import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { AlertModule } from './header/alert/alert.module';
import { CarouselComponent } from './carousel/carousel.component';
import { NguCarouselModule } from '@ngu/carousel';
import { SliderComponent } from './slider/slider.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SliderElementComponent } from './slider/slider-element/slider-element.component';
import { AppRoutingModule } from '../app-routing.module';
import { ClrIconModule } from '@clr/angular';
import { ShowDetailsComponent } from './show-details/show-details.component';
@NgModule({
  declarations: [CarouselComponent, SliderComponent, SliderElementComponent, ShowDetailsComponent],
  imports: [
    CommonModule,
    HeaderModule,
    AlertModule,
    NguCarouselModule,
    SwiperModule,
    AppRoutingModule,
    ClrIconModule
  ],
  exports: [
    HeaderModule,
    AlertModule,
    CarouselComponent,
    SliderComponent,
    ShowDetailsComponent
  ]
})
export class SharedModule { }
