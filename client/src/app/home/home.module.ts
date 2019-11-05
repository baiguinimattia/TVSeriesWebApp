import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DataLayerModule } from '../data-layer/data-layer.module';
import { HomeSearchComponent } from './home-search/home-search.component';
import { SearchResultComponent } from './home-search/search-result/search-result.component';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent, HomeSearchComponent, SearchResultComponent],
  imports: [
    CommonModule,
    DataLayerModule,
    ClarityModule,
    AppRoutingModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
