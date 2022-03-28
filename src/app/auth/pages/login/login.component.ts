import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;

  formSubmitted = false;
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        console.log(err)
        Swal.fire({ title: 'Error', text: err.error.msg || 'An error ocurred. Please try again later.', icon: 'error', confirmButtonColor: '#ffbb20' })
      }).add(() => {
      })
  }

  invalidField(field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  get emailErrorMsg(): string {
    const errors = this.loginForm.get('email')?.errors;
    if (errors?.required) {
      return 'Required'
    } else {
      return 'Email is not valid'
    }
  }

  get passwordErrorMsg(): string {
    const errors = this.loginForm.get('password')?.errors;
    if (errors?.required) {
      return 'Required'
    } else {
      return ''
    }
  }

}
