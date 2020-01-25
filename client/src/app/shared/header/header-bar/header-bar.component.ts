import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/state/auth.state';
import { tap } from 'rxjs/operators';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { ThemeService } from '../../theme.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  public authStatus: boolean;
  @Emitter(AuthState.logout)
  public logoutEvent: Emittable;

  theme = true;

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

}
