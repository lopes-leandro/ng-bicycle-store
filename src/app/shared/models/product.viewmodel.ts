import { Product, ProductApi } from './product.model';

export class ProductViewmodel {
    public static fromApi(productApi: ProductApi): Product {
        return {
            id: productApi.id,
            description: productApi.description,
            brand: { ...productApi.brand, name: productApi.brand.description },
            category: { ...productApi.category, name: productApi.category.description},
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
            brand: {...product.brand, description: product.brand.name},
            category: {...product.category, description: product.category.name},
            purchase_value: product.vlrPurchase,
            sales_value: product.vlrSales,
            quantity: product.quantity,
            image: product.image,
            flag_active: product.active,
            dt_creation: product.dtCreation
        }
    }
}
