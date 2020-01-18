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

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
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
    // this.store.select(AuthState.isAuthenticated).pipe(
    //   tap((result: boolean) => {
    //     if (result) {
    //       this.router.navigate(['/home']);
    //     }
    //   })
    // ).subscribe()
    if( this.store.selectSnapshot(AuthState.isAuthenticated)) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    if (this.form.valid) {
      this.store.dispatch(new Login(this.form.value)).pipe(
        tap((result) => {}),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              this.toastr.error('Error while submiting data.');
              return throwError(error);
          }
        })
      ).subscribe(
        (res) => {
          this.toastr.success('You were logged in succesfully!');
          this.router.navigate(['/home']);
        },
        (err) => {
          this.toastr.error(err.error.message);
          this.form.setValue({ email: this.form.get('email').value, password: '' });
        });

    }
  }

}
