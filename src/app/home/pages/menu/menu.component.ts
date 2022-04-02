import { Component, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as home from '../../store/home.actions';
import { AppStateWithHomeReducer } from '../../store/home.reducers';
import { Subscription } from 'rxjs';
import { Menu } from '../../interfaces/index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  menu: Menu[] = [];
  loading: boolean = false;
  faPen = faPen;
  faTrash = faTrash;

  private _subscription!: Subscription;
  constructor(private store: Store<AppStateWithHomeReducer>) {
    this.store.select('home').subscribe(({ menuPage }) => {
      this.menu = menuPage.menu;
      this.loading = menuPage.loading;
    });

    this.store.dispatch(home.getMenu());
  }

  ngOnInit(): void {

  }

}
