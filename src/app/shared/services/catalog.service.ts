import { inject, Injectable } from '@angular/core';
import { Catalog, CatalogPreFilter } from '@models/catalog.model';
import { forkJoin, map, Observable } from 'rxjs';
import { ProductService } from './product.service';
import { CategoriesService } from './categories.service';
import { BrandsService } from './brands.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private readonly ProductService = inject(ProductService);
  private readonly categoryService = inject(CategoriesService);
  private readonly brandService = inject(BrandsService);

  getCatalogPreFilter(flagActive: boolean = true): Observable<CatalogPreFilter[]> {
    return this.categoryService
      .getCategories(flagActive)
      .pipe(
        map(categories => categories.map(category => (
          {
            id: category.id,
            description: category.name,
            image: category.image ?? '',
            active: category.active
          }
        )))
      )
  }

  getCatalog(categoryId?: string, flagActive?: boolean): Observable<Catalog[]> {
    return forkJoin({
      products: this.ProductService.getProducts(categoryId, flagActive),
      brands: this.brandService.getBrands()
    }).pipe(
      map((data) => {
        return data.products.map(product => ({
          id: product.id,
          description: product.description,
          active: product.active,
          image: product.image,
          vlrSales: product.vlrSales,
          brand: data.brands.find(brand => brand.id === product.brandId) || null
        }))
      })
    )
  }

}
