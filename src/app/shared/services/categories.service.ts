import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryApiModel, CategoryView } from '@models/categories';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/categories';


  constructor() { }

  getCategories(token?: string): Observable<CategoryView[]> {
    const apiUlrFilter = token ? `${this.apiUrl}?${token}` : this.apiUrl
    return this.http
      .get<CategoryApiModel[]>(apiUlrFilter)
      .pipe(
        map(
          apiResponse => apiResponse.map(apiItem => this.mapToItemViewModel(apiItem))
        )
      )
  }

  getCategory(id: string): Observable<CategoryView> {
    return this.http
      .get<CategoryApiModel[]>(`${this.apiUrl}?id=${id}`)
      .pipe(
        map(
          apiResponse => this.mapToItemViewModel(apiResponse[0]))
      )
  }

  addCategory(category: CategoryView): Observable<CategoryView> {
    const item: CategoryApiModel = {
      id: category.id,
      description: category.name,
      flag_active: category.active
    }
    return this.http
      .post<CategoryApiModel>(this.apiUrl, item)
      .pipe(
        map(
          apiResponse => this.mapToItemViewModel(apiResponse)
        )
      );
  }

  updateCategory(categoryId: string, category: CategoryView): Observable<CategoryView> {
    const item: CategoryApiModel = {
      id: category.id,
      description: category.name,
      image: 'https://via.placeholder.com/141x120',
      flag_active: category.active
    }
    return this.http
      .put<CategoryApiModel>(`${this.apiUrl}/${categoryId}`, item)
      .pipe(
        map(apiResponse => this.mapToItemViewModel(apiResponse))
      );
  }

  private mapToItemViewModel(apiItem: CategoryApiModel): CategoryView {
    return {
      id: apiItem.id,
      name: apiItem.description,
      active: apiItem.flag_active
    }
  }
}
