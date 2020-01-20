import { Component, OnInit } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { Select } from '@ngxs/store';
import { DetailsState } from 'src/app/state/state/details.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Select(DetailsState.getDetails) details$: Observable<ShowDetails>;
  @Select(DetailsState.getPosterPath) posterPath$: Observable<string>;
  constructor() { }

  ngOnInit() {
  }
}
