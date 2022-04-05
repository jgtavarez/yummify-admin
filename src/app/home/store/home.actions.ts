import { createAction, props } from '@ngrx/store';
import { MenuResp, MenuFilters, AdministratorResp, AdministratorFilters, Pagination } from '../interfaces';

// Menu
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

// Administrators
export const getAdministrators = createAction(
  '[home] getAdministrators',
  props<{ pagination: Pagination, filters: AdministratorFilters }>()
);

export const getAdministratorsSuccess = createAction(
  '[home] getAdministratorsSuccess',
  props<{ resp: AdministratorResp }>()
);

export const getAdministratorsFailure = createAction(
  '[home] getAdministratorsFailure'
);