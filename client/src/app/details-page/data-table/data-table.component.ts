import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ShowDetails } from '../../interfaces/show-details.interface';
import { TvService } from '../../data-layer/tv.service';
import { Subscription } from 'rxjs';
import { ExternalIds } from '../../interfaces/external-ids.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {

  doesDataExist: boolean = false;
  @Input('data') data: ShowDetails;
  constructor(private readonly tvService: TvService) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data) {
      this.doesDataExist = true;
      this.subscriptions.add(this.tvService.getExternalIds(this.data.id).subscribe((response: ExternalIds) => console.log(response)));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
