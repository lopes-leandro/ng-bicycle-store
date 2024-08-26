import { Brand, BrandApi } from "./brand.model";
import { CategoryApiModel, CategoryView } from "./categories";

export interface Product {
    id: number;
    description: string;
    quantity: number;
    category: CategoryView;
    brand: Brand;
    dtCreation: string;
    active: boolean;
    image: string;
    vlrSales: number;
    vlrPurchase: number;
}

export interface ProductApi {
    id: number;
    description: string;
    category: CategoryApiModel;
    brand: BrandApi;
    purchase_value: number;
    sales_value: number;
    dt_creation: string;
    flag_active: boolean;
    image: string;
    quantity: number;
}
