import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BrandApi, Brand } from '@models/brand.model';
import { BrandViewModel } from '@models/brand.viewmodel';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/brands';


  constructor() { }

  getBrands(): Observable<Brand[]> {
    return this.http
      .get<BrandApi[]>(this.apiUrl)
      .pipe(
        map(
          brandApi => brandApi.map(BrandViewModel.fromApi)
        )
      )
  }

  getBrand(id: string): Observable<Brand> {
    return this.http
      .get<BrandApi[]>(`${this.apiUrl}?id=${id}`)
      .pipe(
        map(
          brandApi => BrandViewModel.fromApi(brandApi[0])
        )
      )
  }

  addBrand(brand: Brand): Observable<Brand> {
    const brandApi = BrandViewModel.toApi(brand);
    return this.http
      .post<BrandApi>(this.apiUrl, brandApi)
      .pipe(
        map(BrandViewModel.fromApi)
      );
  }

  updateBrand(id: string, brand: Brand): Observable<Brand> {
    const brandApi = BrandViewModel.toApi(brand);
    return this.http
      .put<BrandApi>(`${this.apiUrl}/${id}`, brandApi)
      .pipe(
        map(BrandViewModel.fromApi)
      );
  }
}
