import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularComponent } from './popular.component';
import { PopularItemComponent } from './popular-item/popular-item.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [PopularComponent, PopularItemComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class PopularModule { }
