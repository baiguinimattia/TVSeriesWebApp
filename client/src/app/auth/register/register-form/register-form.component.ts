import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  form: FormGroup;
  register: Emittable<{ email: string, password: string }>;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService,
    private route: ActivatedRoute, private router: Router, private readonly toastr: ToastrService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe(
        (response) => {
          this.toastr.success('You have been registered succesfully!');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.form.setValue({ email: this.form.get('email').value, password: '' });
          this.toastr.error('Error while registering!');
        }
      );
    }
  }
}
