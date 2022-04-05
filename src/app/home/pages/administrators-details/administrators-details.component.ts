import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdministratorsService } from '../../services/administrators.service';

@Component({
  selector: 'app-administrators-details',
  templateUrl: './administrators-details.component.html',
  styles: [
  ]
})
export class AdministratorsDetailsComponent implements OnInit {

  formSubmitted = false;
  id!: string | null;
  public menuForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
    password: ['', Validators.minLength(8)],
    role: ['', Validators.required],
  });

  constructor(private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private administratorsService: AdministratorsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id == 'create') {
      return;
    }

    this.administratorsService.getAdminById(Number(this.id))
      .subscribe(resp => {
        this.menuForm.patchValue({
          name: resp.name,
          email: resp.email,
          role: resp.role,
        });
      }, (err) => {
        Swal.fire({ title: 'Error', text: err.error.msg || 'An error ocurred. Please try again later.', icon: 'error', confirmButtonColor: '#ffbb20' })
          .then(function () {
            window.location.href = '/administrators';
          });
      })
  }

  submit() {
    this.formSubmitted = true;

    if (this.menuForm.invalid) {
      return;
    }

    if (this.id === 'create') {
      this.administratorsService.postAdmin(this.menuForm.value)
        .subscribe(resp => {
          Swal.fire({ title: 'Added', text: 'Admin added successfully.', icon: 'success', confirmButtonColor: '#ffbb20' })
            .then(function () {
              window.location.href = '/administrators';
            });
        }, (err) => {
          Swal.fire({ title: 'Error', text: err.error.msg || 'An error ocurred. Please try again later.', icon: 'error', confirmButtonColor: '#ffbb20' })
        })
    } else {

      const clean = (obj: any) => {
        for (var propName in obj) {
          if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
          }
        }
        return obj
      }

      this.administratorsService.updateAdmin(clean(this.menuForm.value), Number(this.id))
        .subscribe(resp => {
          Swal.fire({ title: 'Updated', text: 'Admin updated successfully.', icon: 'success', confirmButtonColor: '#ffbb20' })
        }, (err) => {
          Swal.fire({ title: 'Error', text: err.error.msg || 'An error ocurred. Please try again later.', icon: 'error', confirmButtonColor: '#ffbb20' })
        })
    }
  }

  invalidField(field: string): boolean {
    if (this.menuForm.get(field)?.invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  get nameErrorMsg(): string {
    const errors = this.menuForm.get('name')?.errors;
    if (errors?.required) {
      return 'Required'
    } else {
      return 'Name is not valid'
    }
  }

  get emailErrorMsg(): string {
    const errors = this.menuForm.get('email')?.errors;
    if (errors?.required) {
      return 'Required'
    } else {
      return 'Email is not valid'
    }
  }

  get passwordErrorMsg(): string {
    const errors = this.menuForm.get('password')?.errors;
    if (errors) {
      return 'Password must contain at least 8 characters'
    }

    return ''
  }

  get roleErrorMsg(): string {
    const errors = this.menuForm.get('role')?.errors;
    if (errors?.required) {
      return 'Required'
    }

    return ''
  }

}
