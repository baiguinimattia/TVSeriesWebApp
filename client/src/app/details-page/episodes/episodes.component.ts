import { Component, OnInit, Input } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
  @Input() details: ShowDetails;
  constructor() { }

  ngOnInit() {
  }

}
