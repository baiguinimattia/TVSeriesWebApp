import { Component, OnInit } from '@angular/core';
import { DataLayerService } from '../data-layer/data-layer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private readonly dataLayerService: DataLayerService) { }

  ngOnInit() {
    // this.dataLayerService.search('Game of thrones').subscribe( (response) => console.log(response));
    // this.dataLayerService.getShowEpisodesById('tt0944947').subscribe( (response) => console.log(response));
  }

}
