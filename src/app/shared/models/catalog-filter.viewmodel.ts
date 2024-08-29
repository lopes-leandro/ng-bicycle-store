import { Catalog, CatalogApi } from "./catalog.model";
import { Product, ProductApi } from "./product.model";

export class CatalogFilterViewModel {
    public static fromApi(catalogApi: CatalogApi): Catalog {
        return {
            id: catalogApi.id,
            name: catalogApi.description,
            image: catalogApi.image || ''
        }
    }
}

export class CatalogListViewModel {
    public static fromApi(productApi: ProductApi): Product {
        return {
            id: productApi.id,
            description: productApi.description,
            quantity: productApi.quantity,
            categoryId: productApi.categoryId,
            brandId: productApi.brandId,
            vlrPurchase: productApi.purchase_value,
            vlrSales: productApi.sales_value,
            dtCreation: productApi.dt_creation,
            active: productApi.flag_active,
            image: productApi.image
        }
    }
}