import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '@services/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoryView } from 'src/app/shared/models/categories';
import { v7 as uuid7 } from "uuid";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  private categoriesService = inject(CategoriesService);
  private destroy$ = new Subject<void>();
  categories$!: CategoryView[];

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getCategories(): void {
    this.categoriesService.getCategories()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.categories$ = data;
      })
  }

  handleUuid(): void {
    console.log(uuid7());
  }

}
