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
    type: Type;
}

export enum Type {
    Burger = "burger",
    Pizza = "pizza",
    Extra = "extra",
}

export interface Pagination {
    limit: number;
    offset: number;
}
