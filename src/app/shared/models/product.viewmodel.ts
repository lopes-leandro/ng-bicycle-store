import { Product, ProductApi, ProductApiFilter, ProductFilter } from './product.model';

export class ProductViewModel {
    public static fromApi(productApi: ProductApi): Product {
        return {
            id: productApi.id,
            description: productApi.description,
            brandId: productApi.brandId,
            categoryId: productApi.categoryId,
            quantity: productApi.quantity,
            vlrPurchase: productApi.purchase_value,
            vlrSales: productApi.sales_value,
            image: productApi.image,
            active: productApi.flag_active,
            dtCreation: productApi.dt_creation
        }
    }

    public static toApi(product: Product): ProductApi {
        return {
            id: product.id,
            description: product.description,
            brandId: product.brandId,
            categoryId: product.categoryId,
            purchase_value: product.vlrPurchase,
            sales_value: product.vlrSales,
            quantity: product.quantity,
            image: product.image,
            flag_active: product.active,
            dt_creation: product.dtCreation
        }
    }

    public static fromApiFilter(productApi: ProductApiFilter): ProductFilter {
        return {
            ...productApi,
            active: productApi.flag_active,
            dtCreation: productApi.dt_creation,
            vlrPurchase: productApi.purchase_value,
            vlrSales: productApi.sales_value,
            category: {
                id: productApi.category.id, 
                name: productApi.category.description,
                active: productApi.category.flag_active
            },
            brand: {
                id: productApi.brand.id,
                name: productApi.brand.description,
                active: productApi.brand.flag_active
            }
        }
    }
}

