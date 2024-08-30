import { Brand } from './brand.model';

interface CatalogBase {
    id: string;
    description: string;
    image: string;
    active: boolean;
}

export interface CatalogApi extends Catalog{}

export interface CatalogPreFilter extends CatalogBase{}

export interface Catalog extends CatalogBase {
    vlrSales: number;
    brand: Brand | null;
}