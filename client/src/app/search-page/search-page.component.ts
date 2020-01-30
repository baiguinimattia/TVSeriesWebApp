import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowResult } from '../interfaces/show-result.interface';
import { SearchService } from '../data-layer/search.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  results: ShowResult[];
  toggleOpen: boolean;
  search$: any;
  @ViewChild('searchText', { static: true }) searchText: ElementRef;
  constructor(private readonly searchService: SearchService, private readonly toast: ToastrService) { }

  ngOnInit() {
    this.results = [];
    this.toggleOpen = false;
  }

  toggle() {
    this.toggleOpen = true;
    this.searchText.nativeElement.focus();
    if(this.searchText.nativeElement.value) {
      this.search$ = this.searchService.searchTv(this.searchText.nativeElement.value).pipe(
        tap((response: ShowResult[]) => this.results = response),
      ).subscribe()
    }
  }

}
