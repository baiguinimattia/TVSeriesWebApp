import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AppRoutingModule } from '../app-routing.module';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [SearchPageComponent, SearchResultComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ClarityModule
  ],
  exports: [SearchPageComponent]
})
export class SearchPageModule { }
