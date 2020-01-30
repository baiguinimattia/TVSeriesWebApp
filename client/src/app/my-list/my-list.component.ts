import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { MainState } from '../state/state/main.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  @Select(MainState.myList) myList$: Observable<string[]>;
  constructor() { }

  ngOnInit() {
  }

}
