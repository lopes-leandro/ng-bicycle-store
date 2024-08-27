import { CategoryApiModel } from './categories';

export interface Catalog {
    id: number;
    name: string;
    image: string;
}

export interface CatalogApi extends CategoryApiModel {}
