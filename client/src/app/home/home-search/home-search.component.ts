import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { HomeSearchService } from './home-search.service';
import { ShowResult } from '../../interfaces/show-result.interface';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {
  results: ShowResult[];
  toggleOpen: boolean;
  @ViewChild('searchText', { static: true }) searchText: ElementRef;
  constructor(private readonly homeSearchService: HomeSearchService) { }

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
    this.homeSearchService.searchEntries(this.searchText.nativeElement.value).subscribe((response) => {
      this.results = response;
    });
  }

}
