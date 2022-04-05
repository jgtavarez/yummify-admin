import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as HomeActions from './home.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { AdministratorsService } from '../services/administrators.service';

@Injectable()
export class homeEffects {

  constructor(private actions: Actions, private menuService: MenuService, private administratorsService: AdministratorsService) { }

  getMenu = createEffect(
    () => this.actions.pipe(
      ofType(HomeActions.getMenu),
      mergeMap(
        (action) => this.menuService.getMenu(action.pagination, action.filters)
          .pipe(
            map(resp => HomeActions.getMenuSuccess({ resp: resp })),
            catchError(err => of(HomeActions.getMenuFailure()))
          )
      )
    )
  );

  getAdministrators = createEffect(
    () => this.actions.pipe(
      ofType(HomeActions.getAdministrators),
      mergeMap(
        (action) => this.administratorsService.getAdministrators(action.pagination, action.filters)
          .pipe(
            map(resp => HomeActions.getAdministratorsSuccess({ resp: resp })),
            catchError(err => of(HomeActions.getAdministratorsFailure()))
          )
      )
    )
  );

}