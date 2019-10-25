import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DataLayerModule } from '../data-layer/data-layer.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DataLayerModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
