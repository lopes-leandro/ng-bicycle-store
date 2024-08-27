import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CatalogFilterViewModel, CatalogListViewModel } from '@models/catalog-filter.viewmodel';
import { Catalog, CatalogApi } from '@models/catalog.model';
import { Product, ProductApi } from '@models/product.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = {
    categories: 'http://localhost:3000/categories',
    products: 'http://localhost:3000/products'
  };

  constructor() { }

  getPreFilter(): Observable<Catalog[]> {
    return this.http
      .get<CatalogApi[]>(`${this.apiUrl.categories}?flag_active=true`)
      .pipe(
        map(
          catalogApi => catalogApi.map(CatalogFilterViewModel.fromApi)
        )
      )
  }

  getProductsByCategoryId(categoryId: string): Observable<Product[]> {
    return this.http
    .get<ProductApi[]>(`${this.apiUrl.products}?flag_active=true&category.id=${categoryId}`)
    .pipe(
      map(
        catalogApi => catalogApi.map(CatalogListViewModel.fromApi)
      )
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http
    .get<ProductApi[]>(`${this.apiUrl.products}?flag_active=true`)
    .pipe(
      map(
        catalogApi => catalogApi.map(CatalogListViewModel.fromApi)
      )
    );
  }

}
