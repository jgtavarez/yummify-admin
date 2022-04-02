import { createAction, props } from '@ngrx/store';
import { MenuResp, Pagination } from '../interfaces';

export const getMenu = createAction(
  '[home] getMenu',
  props<{ pagination: Pagination }>()
);

export const getMenuSuccess = createAction(
  '[home] getMenuSuccess',
  props<{ resp: MenuResp }>()
);

export const getMenuFailure = createAction(
  '[home] getMenuFailure'
);