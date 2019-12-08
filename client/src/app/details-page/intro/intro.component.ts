import { Component, OnInit, Input } from '@angular/core';
import { Intro } from 'src/app/interfaces/show-details.interface';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  @Input() data: Intro = { name: '', overview: ''};
  constructor() { }

  ngOnInit() {
  }

}
