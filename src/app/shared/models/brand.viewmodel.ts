import { BrandApi, Brand } from "./brand.model";

export class BrandViewModel {
    public static fromApi(brandApi: BrandApi): Brand {
        return {
            id: brandApi.id,
            name: brandApi.description
        }
    }

    public static toApi(brand: Brand): BrandApi {
        return {
            id: brand.id,
            description: brand.name
        }
    }
}
