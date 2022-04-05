import { createReducer, on } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from './home.actions';

export interface HomeState {
    menuPage: any;
    administratorsPage: any;
}

export interface AppStateWithHomeReducer extends AppState {
    home: HomeState
}

export const homeInitialState: HomeState = {
    menuPage: {
        resp: {},
        loading: false,
        error: ''
    },
    administratorsPage: {
        resp: {},
        loading: false,
        error: ''
    }
};

const _homeReducer = createReducer(homeInitialState,

    on(actions.getMenu, state => ({
        ...state,
        menuPage: {
            ...state.menuPage,
            loading: true
        }
    })),

    on(actions.getMenuSuccess, (state, { resp }) => ({
        ...state,
        menuPage: {
            ...state.menuPage,
            resp,
            loading: false,
        }
    })),

    on(actions.getMenuFailure, state => ({
        ...state,
        menuPage: {
            ...state.menuPage,
            menu: [],
            loading: false,
            error: 'Error loading menu.'
        }
    })),

    on(actions.getAdministrators, state => ({
        ...state,
        administratorsPage: {
            ...state.administratorsPage,
            loading: true
        }
    })),

    on(actions.getAdministratorsSuccess, (state, { resp }) => ({
        ...state,
        administratorsPage: {
            ...state.administratorsPage,
            resp,
            loading: false,
        }
    })),

    on(actions.getAdministratorsFailure, state => ({
        ...state,
        administratorsPage: {
            ...state.administratorsPage,
            administrators: [],
            loading: false,
            error: 'Error loading administrators.'
        }
    })),

);

export function homeReducer(state: any, action: any) {
    return _homeReducer(state, action);
}