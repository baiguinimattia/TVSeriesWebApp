import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ShowDetails } from '../../interfaces/show-details.interface';
import { TvService } from '../../data-layer/tv.service';
import { Subscription, from, Observable } from 'rxjs';
import { ExternalIds } from '../../interfaces/external-ids.interface';
import { tap, map, switchMap } from 'rxjs/operators';
import { PersonDetails, Person } from '../../interfaces/person.interface';
import { PersonService } from '../../data-layer/person.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {

  doesDataExist: boolean = false;
  @Input() data: ShowDetails;
  externalIds: ExternalIds;
  persons: Observable<PersonDetails>[];

  constructor(private readonly tvService: TvService, private readonly personService: PersonService) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data) {
      this.subscriptions.add(this.tvService.getExternalIds(this.data.id).pipe(
        tap((externalIds: ExternalIds) => this.externalIds = externalIds),
      ).subscribe((response: ExternalIds) => {
        this.doesDataExist = true;
      }));

      this.subscriptions.add(
        this.tvService.getCredits(this.data.id).pipe(
          map(credits => credits.cast),
          switchMap(cast => from(cast)),
          map((person: Person) => this.personService.getDetails(person.id)),
        )
          .subscribe((response) => this.persons.push(response)),
      );

    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
