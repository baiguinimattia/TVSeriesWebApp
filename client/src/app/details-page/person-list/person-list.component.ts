import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PersonDetails } from '../../interfaces/person.interface';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, OnChanges {
  @Input() person;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.person) {
      console.log(this.person);
    }
  }

}
