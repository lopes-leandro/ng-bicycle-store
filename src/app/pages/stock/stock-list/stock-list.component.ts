import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductFilter } from '@models/product.model';
import { ProductService } from '@services/product.service';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {

  private readonly productService$ = inject(ProductService);
  private destroy$ = new Subject<void>();
  products$!: ProductFilter[];
  
  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProducts(): void {
    this.productService$
      .getProductsEmbed()
      .pipe(
        takeUntil(this.destroy$),
        map(m => this.products$ = m))
      .subscribe();
  }

}
