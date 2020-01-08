import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-guide-button',
  templateUrl: './guide-button.component.html',
  styleUrls: ['./guide-button.component.css']
})
export class GuideButtonComponent implements OnInit {
  @Input() episodeNumber: number;
  constructor() { }

  ngOnInit() {
  }

}
