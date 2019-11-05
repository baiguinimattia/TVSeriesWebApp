import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../data-layer/tv.service';
import { ShowDetails } from '../interfaces/show-details.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  id: string;
  details: ShowDetails;
  detail$: any;
  constructor(private route: ActivatedRoute, private readonly tvService: TvService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.detail$ = this.tvService.getDetails(this.id).subscribe( (details) => {
      this.details = details;
    });
  }

}
