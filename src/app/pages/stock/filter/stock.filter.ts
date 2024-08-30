import { ClrDatagridComparatorInterface } from "@clr/angular";
import { ProductFilter } from "@models/product.model";

export class DescriptionSort implements ClrDatagridComparatorInterface<ProductFilter> {
    compare(a: ProductFilter, b: ProductFilter): number {
        return a.description.localeCompare(b.description)
    }

}