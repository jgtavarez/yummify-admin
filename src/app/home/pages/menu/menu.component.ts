import { Component, OnInit } from '@angular/core';
import { faPen, faTrash, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as home from '../../store/home.actions';
import { AppStateWithHomeReducer } from '../../store/home.reducers';
import { Subscription } from 'rxjs';
import { MenuResp, Pagination } from '../../interfaces/index';

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

  private _subscription!: Subscription;
  constructor(private store: Store<AppStateWithHomeReducer>) { }

  ngOnInit(): void {
    this.store.select('home').subscribe(({ menuPage }) => {
      this.resp = menuPage.resp;
      this.loading = menuPage.loading;
    });

    this.store.dispatch(home.getMenu({ pagination: this.pagination }));
  }

  changePagination(newOffset: number) {
    console.log(newOffset)
    this.pagination = {
      ...this.pagination,
      offset: newOffset
    }

    this.ngOnInit()
  }

}
