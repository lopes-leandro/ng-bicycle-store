import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '@services/categories.service';
import { CategoryView } from 'src/app/shared/models/categories';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  private categoriesService = inject(CategoriesService);
  
  categories$!: CategoryView[];
  
  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories():void {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories$ = data;
      console.log(data);
      
    })
  }
}
