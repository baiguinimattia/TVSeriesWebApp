import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
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
  public login: Emittable<AuthStateModel>;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
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
      // this.login.emit(this.form.value).pipe(
      //   tap((response) => {
      //     this.toastr.success('You were logged in succesfully!');
      //     this.router.navigate(['/home']);
      //   }),
      // ).subscribe(
      //   (response) => {
      //     console.log(response);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );

      this.authService.login(this.form.value).subscribe(
        (response: { token: string, email: string}) => {
          this.login.emit(response);
          this.toastr.success('You were logged in succesfully!');
          this.router.navigate(['/home']);
        },
        (error) => {
          this.toastr.error('Username or password incorrect!');
          this.form.reset();
        }
      );
    }
  }

}
