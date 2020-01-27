import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { AuthState } from 'src/app/state/state/auth.state';
import { tap } from 'rxjs/operators';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { ThemeService } from '../../theme.service';
import { FormControl } from '@angular/forms';
import { MainState } from 'src/app/state/state/main.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  public authStatus: boolean;
  @Emitter(AuthState.logout)
  public logoutEvent: Emittable;

  @Select(MainState.menuState) menuState$: Observable<boolean>;
  @Emitter(MainState.setMenuState)
  public changedState: Emittable<boolean>;


  theme = true;
  menuState: boolean;

  constructor(private route: ActivatedRoute, private store: Store,
    private router: Router, private readonly toastr: ToastrService,
    private themeService: ThemeService) {
    this.authStatus = false;
    this.themeService.toggleDark();
  }

  ngOnInit() {
    this.store.select(AuthState.isAuthenticated).pipe(
      tap( (result) => this.authStatus = result),
    ).subscribe();

    this.menuState$.pipe(
      tap( response => this.menuState = response)
    ).subscribe();
  }

  switchTheme(theme: boolean) {
    if(theme) {
      this.themeService.toggleDark();
    } else {
      this.themeService.toggleWhite();
    }
    this.theme = theme;
    
  }

  public logout(): void {
    this.logoutEvent.emit();
  }

  toggleMenu(menuState: boolean) {
    this.changedState.emit(menuState);
  }

}
