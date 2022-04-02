import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Sidebar {
    icon: IconDefinition;
    text: string;
    url: string;
}

export interface Menu {
    name:        string;
    description: string;
    price:       number;
    calories:    number;
    image:       string;
    type:        string;
}