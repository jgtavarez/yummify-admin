import { createAction, props } from '@ngrx/store';
import { Menu } from '../interfaces';

export const getMenu = createAction(
  '[home] getMenu'
);

export const getMenuSuccess = createAction(
  '[home] getMenuSuccess',
  props<{ menu: Menu[] }>()
);

export const getMenuFailure = createAction(
  '[home] getMenuFailure'
);