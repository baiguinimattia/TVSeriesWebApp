import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { DetailsPageService } from '../details-page.service';
import { Select } from '@ngxs/store';
import { DetailsState } from 'src/app/state/state/details.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnChanges {
  // @Input() details: ShowDetails;
  @Select(DetailsState.getDetails) details$: Observable<ShowDetails>;
  @Select(DetailsState.getPosterPath) posterPath$: Observable<string>;
  constructor(private readonly detailsPageService: DetailsPageService) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
