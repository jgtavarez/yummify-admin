import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPen, faTrash, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as home from '../../store/home.actions';
import { AppStateWithHomeReducer } from '../../store/home.reducers';
import { Subscription } from 'rxjs';
import { AdministratorResp, Pagination } from '../../interfaces/index';
import { AdministratorsService } from '../../services/administrators.service';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styles: [
  ]
})
export class AdministratorsComponent implements OnInit {

  resp!: AdministratorResp;
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
    email: ['', [Validators.required, Validators.maxLength(50)]],
    role: ['', Validators.required],
  });

  private _subscription!: Subscription;
  constructor(private store: Store<AppStateWithHomeReducer>, private administratorsService: AdministratorsService, private fb: FormBuilder) {
    this.filters.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(filters => this.ngOnInit())
    ).subscribe();
  }

  ngOnInit(): void {
    this.store.select('home').subscribe(({ administratorsPage }) => {
      this.resp = administratorsPage.resp;
      this.loading = administratorsPage.loading;
    });

    this.store.dispatch(home.getAdministrators({ pagination: this.pagination, filters: this.filters.value }));
  }

  changePagination(newOffset: number) {
    this.pagination = {
      ...this.pagination,
      offset: newOffset
    }

    this.ngOnInit()
  }

  deleteAdmin(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This admin will be deleted. You can't undo this action.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffbb20',
      cancelButtonColor: '#ef2626',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.administratorsService.deleteAdmin(id)
          .subscribe(resp => {
            Swal.fire({ title: 'Deleted', text: 'Admin deleted successfully.', icon: 'success', confirmButtonColor: '#ffbb20' })
              .then(function () {
                location.reload();
              });
          }, (err) => {
            Swal.fire({ title: 'Error', text: 'Error deleting admin.', icon: 'error', confirmButtonColor: '#ffbb20' })
          }).add(() => {
          })
      }
    });
  }

}
