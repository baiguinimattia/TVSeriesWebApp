import { Component, OnInit } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { Select } from '@ngxs/store';
import { DetailsState } from 'src/app/state/state/details.state';
import { Observable, of } from 'rxjs';
import { DetailsPageService } from '../details-page.service';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { MainState } from 'src/app/state/state/main.state';
import { TvService } from 'src/app/data-layer/tv.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Select(DetailsState.getDetails) details$: Observable<ShowDetails>;
  @Select(DetailsState.getPosterPath) posterPath$: Observable<string>;
  @Select(MainState.myList) myList$: Observable<string[]>;
  @Emitter(MainState.updateMyList)
  public updateList: Emittable<string[]>;

  private myList: string[];
  ifInList: boolean = false;


  constructor(private detailsSrv: DetailsPageService, private tvSrv: TvService,
    private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.myList$.subscribe(response => {
      this.myList = response;
    });
  }

  update(id: string) {
    id = id.toString();
    if (this.myList.find(el => el === id)) {
      this.tvSrv.removeShow(id).pipe(
        tap((response: string[]) => {
          this.myList.splice(this.myList.findIndex(el => el === id), 1);
          this.updateList.emit(this.myList);
        })
      ).subscribe(() => this.toastr.info('Show succesfully removed!'));
    } else {
      this.tvSrv.addShow(id).pipe(
        tap(() => {
          this.myList.push(id);
          this.updateList.emit(this.myList);
        })
      ).subscribe(() => this.toastr.info('Show succesfully added!'));
    }
  }
}
