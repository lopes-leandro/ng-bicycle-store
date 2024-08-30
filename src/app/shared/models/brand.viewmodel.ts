import { BrandApi, Brand } from "./brand.model";

export class BrandViewModel {
    public static fromApi(brandApi: BrandApi): Brand {
        return {
            id: brandApi.id,
            name: brandApi.description,
            active: brandApi.flag_active
        }
    }

    public static toApi(brand: Brand): BrandApi {
        return {
            id: brand.id,
            description: brand.name,
            flag_active: brand.active
        }
    }
}
