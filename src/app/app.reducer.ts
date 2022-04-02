import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/store/auth.reducers';

export interface AppState {
  auth: auth.authState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
};