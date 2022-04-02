import { createReducer, on } from '@ngrx/store';
import { Admin } from '../../shared/models/admin.model';
import { setUser, removeUser } from './auth.actions';

export interface authState {
    admin: Admin;
}

export const authInitialState: authState = {
    admin: {
        id: 0,
        name: '',
        email: '',
        status: false,
        role: ''
    }
};

const _authReducer = createReducer(authInitialState,

    on(setUser, (state, { admin }) => ({
        ...state,
        admin: { ...admin }
    })),

    on(removeUser, state => ({
        ...state,
        admin: {
            id: 0,
            name: '',
            email: '',
            status: false,
            role: ''
        }
    }))

);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}