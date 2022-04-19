import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styles: [
  ]
})
export class MenuDetailsComponent implements OnInit {

  formSubmitted = false;
  id!: string | null;
  public menuForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    price: ['', [Validators.required]],
    calories: ['', Validators.required],
    type: ['', Validators.required],
    image: ['', Validators.required]
  });

  constructor(private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private menuService: MenuService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id == 'create') {
      return;
    }

    this.menuService.getFoodById(Number(this.id))
      .subscribe(resp => {
        this.menuForm.patchValue({
          name: resp.name,
          description: resp.description,
          price: resp.price,
          calories: resp.calories,
          type: resp.type
        });
        this.img = resp.image
      }, (err) => {
        Swal.fire({ title: 'Error', text: err.error.msg || 'An error ocurred. Please try again later.', icon: 'error', confirmButtonColor: '#ffbb20' })
          .then(function () {
            window.location.href = '/menu';
          });
      })
  }

  img = 'https://res.cloudinary.com/drftnvehe/image/upload/v1650351211/image-preview_uv0kos.png'

  change(e: any) {
    const image = e.target.files[0]
    this.toBase64(image).then((image: any) => {
      this.menuForm.patchValue({
        image
      });
      this.img = image
    })
  }

  toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  submit() {
    this.formSubmitted = true;

    if (this.menuForm.invalid) {
      return;
    }

    if (this.id === 'create') {
      this.menuService.postFood(this.menuForm.value)
        .subscribe(resp => {
          Swal.fire({ title: 'Added', text: 'Food added successfully.', icon: 'success', confirmButtonColor: '#ffbb20' })
            .then(function () {
              window.location.href = '/menu';
            });
        }, (err) => {
          Swal.fire({ title: 'Error', text: 'Error adding food.', icon: 'error', confirmButtonColor: '#ffbb20' })
        }).add(() => {
        })
    } else {
      this.menuService.updateMenu(this.menuForm.value, Number(this.id))
        .subscribe(resp => {
          Swal.fire({ title: 'Updated', text: 'Food updated successfully.', icon: 'success', confirmButtonColor: '#ffbb20' })
        }, (err) => {
          Swal.fire({ title: 'Error', text: 'Error updating food.', icon: 'error', confirmButtonColor: '#ffbb20' })
        }).add(() => {
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

  get descriptionErrorMsg(): string {
    const errors = this.menuForm.get('description')?.errors;
    if (errors?.required) {
      return 'Required'
    } else {
      return 'Description is not valid'
    }
  }

  get priceErrorMsg(): string {
    const errors = this.menuForm.get('price')?.errors;
    if (errors?.required) {
      return 'Required'
    }

    return ''
  }

  get caloriesErrorMsg(): string {
    const errors = this.menuForm.get('calories')?.errors;
    if (errors?.required) {
      return 'Required'
    }

    return ''
  }

  get typeErrorMsg(): string {
    const errors = this.menuForm.get('type')?.errors;
    if (errors?.required) {
      return 'Required'
    }

    return ''
  }

  get imageErrorMsg(): string {
    const errors = this.menuForm.get('image')?.errors;
    if (errors?.required) {
      return 'Required'
    }

    return ''
  }

}
