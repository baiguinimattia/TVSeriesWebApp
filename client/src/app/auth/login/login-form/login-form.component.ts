import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private toastr: ToastrService
    ,         private route: ActivatedRoute, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.form.reset();
    this.authService.isAuthenticated();
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('You were logged in succesfully!');
          this.router.navigate(['/home']);
        },
        (err) => {
          this.toastr.error(err.error.message);
          this.form.setValue({ email: this.form.get('email').value, password: ''});
        });
    }
  }

}
