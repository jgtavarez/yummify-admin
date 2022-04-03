import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as HomeActions from './home.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuService } from '../services/menu.service';

@Injectable()
export class homeEffects {

  constructor(private actions: Actions, private menuService: MenuService) { }

  getMenu = createEffect(
    () => this.actions.pipe(
      ofType(HomeActions.getMenu),
      mergeMap(
        (action) => this.menuService.getMenu(action.pagination)
          .pipe(
            map(resp => HomeActions.getMenuSuccess({ resp: resp })),
            catchError(err => of(HomeActions.getMenuFailure()))
          )
      )
    )
  );

}