import { Component, OnInit, Input } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { DetailsPageService } from '../details-page.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
  @Input() details: ShowDetails;
  constructor(private readonly detailsSrv: DetailsPageService) { }

  ngOnInit() {
    this.detailsSrv.getEpisodesBySeasonNo(this.details.id, 1).subscribe(
      result => console.log(result),
    )
  }

}
