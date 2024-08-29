import { Category, CategoryApi } from "./category.model";

export class CategoryViewModel {
    public static fromApi(categoryApi: CategoryApi): Category {
        return {
            id: categoryApi.id,
            name: categoryApi.description,
            active: categoryApi.flag_active
        }
    }

    public static toApi(category: Category): CategoryApi {
        return {
            id: category.id,
            description: category.name,
            flag_active: category.active
        }
    }
}
