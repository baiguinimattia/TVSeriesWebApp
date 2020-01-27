import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DataLayerModule } from '../data-layer/data-layer.module';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DataLayerModule,
    ClarityModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
