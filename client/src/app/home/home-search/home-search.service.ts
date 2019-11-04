import { Injectable } from '@angular/core';
import { DataLayerService } from '../../data-layer/data-layer.service';
import { Observable } from 'rxjs';
import { ShowResult } from '../../interfaces/show-result.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeSearchService {

  constructor(private readonly dataService: DataLayerService) { }

  searchEntries(term): Observable<ShowResult[]> {
    return this.dataService.searchTv(term);
  }

}
