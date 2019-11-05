import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataLayerService } from './data-layer.service';
import { MediaService } from './media.service';
import { SearchService } from './search.service';
import { TvService } from './tv.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DataLayerService,
    MediaService,
    SearchService,
    TvService
  ],
  exports: [],
})
export class DataLayerModule { }
