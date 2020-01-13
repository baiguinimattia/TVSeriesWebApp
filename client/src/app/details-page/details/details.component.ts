import { Component, OnInit, Input } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() details: ShowDetails;
  constructor() { }

  ngOnInit() {
  }

}
