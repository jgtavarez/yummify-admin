import { createAction, props } from '@ngrx/store';
import { Admin } from '../../shared/models/admin.model';

export const setUser = createAction(
  '[auth] setUser',
  props<{ admin: Admin }>()

);

export const removeUser = createAction(
  '[auth] removeUser'
);