import { Brand, BrandApi } from './brand.model';
import { Category, CategoryApi } from './category.model';

export interface Product {
    id: string;
    description: string;
    quantity: number;
    categoryId: string;
    brandId: string;
    dtCreation: string;
    active: boolean;
    image: string;
    vlrSales: number;
    vlrPurchase: number;
}

export interface ProductApi {
    id: string;
    description: string;
    categoryId: string;
    brandId: string;
    purchase_value: number;
    sales_value: number;
    dt_creation: string;
    flag_active: boolean;
    image: string;
    quantity: number;
}

export interface ProductFilter extends Product {
    category: Category;
    brand: Brand
}

export interface ProductApiFilter extends ProductApi {
    category: CategoryApi;
    brand: BrandApi
}