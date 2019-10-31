import { Injectable } from '@angular/core';
import { DataLayerService } from '../../data-layer/data-layer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeSearchService {

  constructor(private readonly dataService: DataLayerService) { }

  searchEntries(term) {
    console.log(term);
    return this.dataService.searchTv(term);
  }

}
