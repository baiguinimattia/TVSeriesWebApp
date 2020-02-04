import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emittable } from '@ngxs-labs/emitter';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  // form: FormGroup;
  registerForm: FormGroup;

  register: Emittable<{ email: string, password: string }>;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService,
    private route: ActivatedRoute, private router: Router, private readonly toastr: ToastrService) {
    // this.form = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required , Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]]
    // });
  }

  ngOnInit() {
    // this.form.reset();
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
      ])
    })
  }

  submit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          this.toastr.success('You have been registered succesfully!');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.registerForm.setValue({ email: this.email.value, password: '' });
          this.toastr.error('Error while registering!');
        }
      );
    }
  }

  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
}
