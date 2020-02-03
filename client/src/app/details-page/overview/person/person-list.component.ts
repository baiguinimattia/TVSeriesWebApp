import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PathsEnum, ProfileSizesEnum } from 'src/app/enums/image-enums';
import { PersonDetails } from 'src/app/interfaces/person.interface';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, OnChanges {
  @Input() person: PersonDetails;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.person) {
    }
  }

  getProfilePhoto() {
    return `${PathsEnum.secured}${ProfileSizesEnum.original}${this.person.profile_path}`;
  }

}
