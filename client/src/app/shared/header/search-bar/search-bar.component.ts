import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataLayerService } from '../../../../../.history/src/app/data-layer/data-layer.service_20191024001046';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchInput', { static: true}) searchInput: ElementRef;
  constructor(private readonly dataLayerService: DataLayerService) { }

  ngOnInit() {

  }

  onKeydown($event) {
    console.log(this.searchInput.nativeElement.value);
    this.dataLayerService.search(this.searchInput.nativeElement.value).subscribe((response) => console.log(response));
  }

}
