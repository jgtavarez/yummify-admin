import { createReducer, on } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from './home.actions';

export interface HomeState {
    menuPage: any;
}

export interface AppStateWithHomeReducer extends AppState {
    home: HomeState
}

export const homeInitialState: HomeState = {
    menuPage: {
        menu: [],
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

    on(actions.getMenuSuccess, (state, { menu }) => ({
        ...state,
        menuPage: {
            ...state.menuPage,
            menu: [...menu],
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

);

export function homeReducer(state: any, action: any) {
    return _homeReducer(state, action);
}