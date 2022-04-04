import { createAction, props } from '@ngrx/store';
import { MenuFilters, MenuResp, Pagination } from '../interfaces';

export const getMenu = createAction(
  '[home] getMenu',
  props<{ pagination: Pagination, filters: MenuFilters }>()
);

export const getMenuSuccess = createAction(
  '[home] getMenuSuccess',
  props<{ resp: MenuResp }>()
);

export const getMenuFailure = createAction(
  '[home] getMenuFailure'
);