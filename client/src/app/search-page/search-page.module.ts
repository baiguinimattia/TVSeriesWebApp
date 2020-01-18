import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AppRoutingModule } from '../app-routing.module';
import { ClarityModule } from '@clr/angular';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  declarations: [SearchPageComponent, SearchResultComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ClarityModule,
    DirectivesModule
  ],
  exports: [SearchPageComponent]
})
export class SearchPageModule { }
