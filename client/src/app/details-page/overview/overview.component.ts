import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { DetailsPageService } from '../details-page.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnChanges {
  @Input() details: ShowDetails;
  posterPath: string;
  constructor(private readonly detailsPageService: DetailsPageService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.details) {
      console.log(this.details);
      this.posterPath = this.detailsPageService.getPosterPath(this.details.backdrop_path);
    }
  }

}
