import { Component, OnInit, Input } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  @Input() details: ShowDetails;
  constructor() { }

  ngOnInit() {
  }

}
