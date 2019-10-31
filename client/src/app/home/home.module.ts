import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DataLayerModule } from '../data-layer/data-layer.module';
import { HomeSearchComponent } from './home-search/home-search.component';
import { SearchResultComponent } from './home-search/search-result/search-result.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [HomeComponent, HomeSearchComponent, SearchResultComponent],
  imports: [
    CommonModule,
    DataLayerModule,
    ClarityModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
