import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/popular.interface';
import { PopularService } from '../popular.service';
import { BackdropSizesEnum } from 'src/app/enums/image-enums';

@Component({
  selector: 'app-popular-item',
  templateUrl: './popular-item.component.html',
  styleUrls: ['./popular-item.component.css']
})
export class PopularItemComponent implements OnInit {
  @Input('show') show: Result;
  constructor(private popService: PopularService) { }

  ngOnInit() {
  }

  getBackgroundUrl() {
    return this.popService.getBackgroundUrl(this.show.backdrop_path, BackdropSizesEnum.w780);
  }

}
