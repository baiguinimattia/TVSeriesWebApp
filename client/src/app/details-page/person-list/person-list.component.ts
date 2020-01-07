import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PersonDetails } from '../../interfaces/person.interface';
import { PathsEnum, ProfileSizesEnum } from 'src/app/enums/image-enums';

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
      console.log(this.person);
    }
  }

  getProfilePhoto() {
    return `${PathsEnum.default}${ProfileSizesEnum.original}${this.person.profile_path}`;
  }

}
