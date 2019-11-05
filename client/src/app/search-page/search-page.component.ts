import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowResult } from '../interfaces/show-result.interface';
import { DataLayerService } from '../data-layer/data-layer.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  results: ShowResult[];
  toggleOpen: boolean;
  @ViewChild('searchText', { static: true }) searchText: ElementRef;
  constructor(private readonly dataLayerService: DataLayerService) { }

  ngOnInit() {
    this.results = [];
    this.toggleOpen = false;
  }

  toggle() {
    this.toggleOpen = !this.toggleOpen;
    if (this.toggleOpen) {
      this.searchText.nativeElement.focus();
    }
  }

  onKeydown($event) {
    this.dataLayerService.searchTv(this.searchText.nativeElement.value).subscribe((response) => {
      this.results = response;
    });
  }
}
