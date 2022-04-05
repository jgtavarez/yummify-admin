import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Sidebar {
    icon: IconDefinition;
    text: string;
    url: string;
}

export interface MenuResp {
    count: number;
    next: number;
    previous: number;
    menu: Menu[];
}

export interface Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    calories: number;
    image: string;
    type: valid_type;
}

export enum valid_type {
    Burger = "burger",
    Pizza = "pizza",
    Extra = "extra",
}

export interface MenuFilters {
    name: string;
    description: string;
    type: valid_type;
}

export interface AdministratorResp {
    count: number;
    next: number;
    previous: number;
    administrators: Admin[];
}

export interface Admin {
    id: number;
    name: string;
    email: string;
    status: boolean;
    role: string;
}

export enum valid_roles {
    Administrator = "administrator",
    Publisher = "publisher",
    Reader = "reader",
}

export interface AdministratorFilters {
    name: string;
    email: string;
    role: valid_roles;
}

export interface Pagination {
    limit: number;
    offset: number;
}


