import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Person } from 'src/app/interfaces/person.interface';
import { Subscription, Observable } from 'rxjs';
import { DetailsPageService } from '../../details-page.service';
import { tap, take, map } from 'rxjs/operators';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { Select } from '@ngxs/store';
import { DetailsState } from 'src/app/state/state/details.state';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription = new Subscription();

  @Select(DetailsState.getCast) cast$: Observable<Person[]>;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
