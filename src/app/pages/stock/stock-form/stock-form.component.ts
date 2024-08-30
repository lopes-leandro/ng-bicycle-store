import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '@models/brand.model';
import { Category } from '@models/category.model';
import { Product } from '@models/product.model';
import { BrandsService } from '@services/brands.service';
import { CategoriesService } from '@services/categories.service';
import { ProductService } from '@services/product.service';
import { map, Subject, takeUntil } from 'rxjs';
import { v7 as uuid7 } from "uuid";
enum TITLE_ENUM {
  CRIAR = 'Criar Produto',
  EDITAR = 'Editar Produto'
}

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit, OnDestroy {

  private readonly categoryService$ = inject(CategoriesService);
  private readonly brandService$ = inject(BrandsService);
  private readonly productService$ = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();
  private productId!: string;

  title = '';
  isVisibleControlId = true;
  isDisabledButtonSubmit = true;
  formProduct!: FormGroup;
  product!: Product;
  categories!: Category[];
  brands!: Brand[];

  ngOnInit(): void {
    this.createFormStock();
    this.checkRouteParameter();
    this.loadBrands();
    this.loadCategories();
    this.formProduct.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        if (status === 'VALID') {
          this.isDisabledButtonSubmit = false;
        } else {
          this.isDisabledButtonSubmit = true;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createFormStock(): void {
    this.formProduct = this.fb.group({
      id: new FormControl({ value: 0, disabled: true }),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      brandId: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      vlrPurchase: new FormControl(null, [Validators.required, Validators.min(0)]),
      vlrSales: new FormControl(null, [Validators.required, Validators.min(0)]),
      active: new FormControl(true, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.formProduct.valid) {
      if (this.productId) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    }
  }

  private addProduct(): void {
    const product = this.fromForm();
    this.productService$.addProduct(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formProduct.reset();
        this.router.navigate(['/estoque']);
      });
  }

  private updateProduct(): void {
    const product = this.fromForm();
    this.productService$
      .updateProduct(this.productId, product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formProduct.reset();
        this.router.navigate(['/estoque']);
      });
  }

  private fromForm(): Product {
    const {
      id,
      vlrSales,
      vlrPurchase,
      active,
      image,
      quantity,
      description,
      brandId,
      categoryId
    } = this.formProduct.getRawValue();
    const category = this.categories.find(f => f.id == categoryId);
    const brand = this.brands.find(f => f.id == brandId);
    return {
      vlrSales,
      vlrPurchase,
      active,
      image,
      quantity,
      description,
      categoryId,
      brandId,
      id: id !== 0 && id !== '0' ? id : uuid7(),
      dtCreation: this.product !== undefined ? this.product.dtCreation : new Date().toISOString()
    }
  }

  private checkRouteParameter(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.title = TITLE_ENUM.EDITAR;
        this.isVisibleControlId = true;
        this.loadProduct(this.productId);
      } else {
        this.title = TITLE_ENUM.CRIAR;
      }
    })
  }

  private loadProduct(productId: string): void {
    this.productService$
      .getProduct(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.product = data;
        this.loadFormEditing(this.product);
      });
  }

  private loadFormEditing(product: Product): void {
    this.formProduct.patchValue({
      ...product,
      brandId: product.brandId,
      categoryId: product.categoryId
    })
  }

  private loadCategories(): void {
    this.categoryService$
      .getCategories()
      .pipe(
        takeUntil(this.destroy$),
        map(m => this.categories = m))
      .subscribe();
  }
  private loadBrands(): void {
    this.brandService$
      .getBrands()
      .pipe(
        takeUntil(this.destroy$),
        map(m => this.brands = m))
      .subscribe();
  }
}
