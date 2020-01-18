import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/state/actions/auth.action';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthState } from 'src/app/state/state/auth.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { AuthStateModel } from 'src/app/state/models/auth.model';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  @Emitter(AuthState.login)
  public login: Emittable<{ email: string, password: string }>;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private toastr: ToastrService
    , private route: ActivatedRoute, private router: Router,
    private store: Store) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.reset();
    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    if (this.form.valid) {
      this.login.emit(this.form.value).pipe(
        tap((response) => {
          this.toastr.success('You were logged in succesfully!');
          this.router.navigate(['/home']);
        }),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              this.form.setValue({ email: this.form.get('email').value, password: '' });
              this.toastr.error('Error while submiting data.');
              return throwError(error);
          }
        }),
      ).subscribe();
    }
  }

}
