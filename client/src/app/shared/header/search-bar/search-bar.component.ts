import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataLayerService } from '../../../data-layer/data-layer.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchInput', { static: true}) searchInput: ElementRef;
  constructor(private readonly dataLayerService: DataLayerService, private readonly authService: AuthService) { }

  ngOnInit() {

  }

  onKeydown($event) {
    this.dataLayerService.searchTv(this.searchInput.nativeElement.value).subscribe((response) => console.log(response));
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
