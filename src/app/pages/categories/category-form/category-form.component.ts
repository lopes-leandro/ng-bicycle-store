import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '@services/categories.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CategoryView } from 'src/app/shared/models/categories';

enum TITLE_ENUM {
  CRIAR = 'Criar Categoria',
  EDITAR = 'Editar Categoria'
}
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  private readonly categoriesService$ = inject(CategoriesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  private categoryId!: string;

  title: string | null = null;
  isDisabledButtonSubmit = true;
  isVisibleControlId = false;
  formCategory!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.createFormCategory();

    this.checkRouteParameter();

    this.formCategory.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        console.log('Status do formulário:', status);
        if (status === 'VALID') {
          this.isDisabledButtonSubmit = false;
        } else {
          this.isDisabledButtonSubmit = true;
        }
      })
  }

  onSubmit(): void {
    if (this.formCategory.valid) {
      if (this.categoryId) {
        this.updateCategory(this.formCategory.value);
      } else {
        this.addCategory(this.formCategory.value);
      }
    }
  }

  private createFormCategory(): void {
    this.formCategory = this.fb.group({
      id: new FormControl({ value: 0, disabled: true }),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      active: new FormControl(true),
    });
  }

  private checkRouteParameter(): void {
    const paramsId = this.route.snapshot.paramMap.get('id');
    if (paramsId) {
      this.categoryId = paramsId;
      this.title = TITLE_ENUM.EDITAR;
      this.isVisibleControlId = true;
      this.getCategory(this.categoryId);
    } else {
      this.title = TITLE_ENUM.CRIAR;
    }
  }

  private getCategory(categoryId: string): void {
    this.categoriesService$
      .getCategory(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loadDataForEditing(data);
      })
  }

  private addCategory(item: CategoryView): void {
    this.categoriesService$
      .addCategory(item)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formCategory.reset();
        this.router.navigate(['/categorias']);
      });
  }

  private updateCategory(item: CategoryView): void {
    this.categoriesService$
      .updateCategory(this.categoryId, item)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formCategory.reset();
        this.router.navigate(['/categorias']);
      });
  }

  private loadDataForEditing(item: Partial<CategoryView>): void {
    this.formCategory.patchValue(item)
  }

}
