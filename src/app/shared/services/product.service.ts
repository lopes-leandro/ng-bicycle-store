import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductApi, ProductApiFilter, ProductFilter } from '@models/product.model';
import { map, Observable } from 'rxjs';
import { ProductViewModel } from '@models/product.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = {
    products: 'http://localhost:3000/products'
  };
  private readonly tokens = {
    _embed: '_embed=category&_embed=brand',
  }

  getProductsEmbed(): Observable<ProductFilter[]> {
    return this.http
      .get<ProductApiFilter[]>(`${this.apiUrl.products}?${this.tokens._embed}`)
      .pipe(
        map(
          apiResponse => apiResponse.map(productApi => ProductViewModel.fromApiFilter(productApi))
        )
      )
  }

  getProducts(categoryId?: string, flagActive?: boolean): Observable<Product[]> {
    let params = new HttpParams();
    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId);
    }
    if (flagActive !== undefined) {
      params = params.set('flag_active', flagActive)
    }
    return this.http
      .get<ProductApi[]>(this.apiUrl.products, {params})
      .pipe(
        map(
          apiResponse => apiResponse.map(productApi => ProductViewModel.fromApi(productApi))
        )
      )
  }

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<ProductApi[]>(`${this.apiUrl.products}?id=${id}`)
      .pipe(
        map(
          apiResponse => ProductViewModel.fromApi(apiResponse[0])
        )
      )
  }

  addProduct(product: Product): Observable<Product> {
    const productApi = ProductViewModel.toApi(product);
    return this.http
      .post<ProductApi>(this.apiUrl.products, productApi)
      .pipe(
        map(ProductViewModel.fromApi)
      );
  }

  updateProduct(productId: string, product: Product): Observable<Product> {   
    const productApi = ProductViewModel.toApi(product);
    return this.http
      .put<ProductApi>(`${this.apiUrl.products}/${productId}`, productApi)
      .pipe(
        map(ProductViewModel.fromApi)
      );
  }
}
