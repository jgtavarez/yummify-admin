import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPen, faTrash, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as home from '../../store/home.actions';
import { AppStateWithHomeReducer } from '../../store/home.reducers';
import { Subscription } from 'rxjs';
import { MenuResp, Pagination } from '../../interfaces/index';
import { MenuService } from '../../services/menu.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  resp!: MenuResp;
  loading: boolean = false;
  faPen = faPen;
  faTrash = faTrash;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  pagination: Pagination = {
    limit: 10,
    offset: 0
  }

  public filters = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    type: ['', Validators.required],
  });

  private _subscription!: Subscription;
  constructor(private store: Store<AppStateWithHomeReducer>, private menuService: MenuService, private fb: FormBuilder) {
    this.filters.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(filters => this.ngOnInit())
    ).subscribe();
  }

  ngOnInit(): void {
    this.store.select('home').subscribe(({ menuPage }) => {
      this.resp = menuPage.resp;
      this.loading = menuPage.loading;
    });

    this.store.dispatch(home.getMenu({ pagination: this.pagination, filters: this.filters.value }));
  }

  changePagination(newOffset: number) {
    this.pagination = {
      ...this.pagination,
      offset: newOffset
    }

    this.ngOnInit()
  }

  deleteFood(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This food will be deleted. You can't undo this action.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffbb20',
      cancelButtonColor: '#ef2626',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.menuService.deleteFood(id)
          .subscribe(resp => {
            Swal.fire({ title: 'Deleted', text: 'Food deleted successfully.', icon: 'success', confirmButtonColor: '#ffbb20' })
              .then(function () {
                location.reload();
              });
          }, (err) => {
            Swal.fire({ title: 'Error', text: 'Error deleting food.', icon: 'error', confirmButtonColor: '#ffbb20' })
          }).add(() => {
          })
      }
    });
  }

}
