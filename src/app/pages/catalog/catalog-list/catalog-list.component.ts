import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { TitleComponent } from '@components/title/title.component';
import { CardProductComponent } from '@components/card-product/card-product.component';
import { ClarityModule } from '@clr/angular';
import { CardProductModel } from '@components/card-product/card-product-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '@services/catalog.service';
import { map, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface CardCatalog {
  id: string;
  title: string;
  subTitle: string;
  value: number;
  urlImage: string;
  attrAltImage?: string;
}

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [NgFor, CurrencyPipe, TitleComponent, CardProductComponent, ClarityModule, FormsModule],
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit, OnDestroy {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalogService$ = inject(CatalogService);
  private destroy$ = new Subject<void>();

  cardCatalogList: CardCatalog[] = [];
  selection!: [{ id: number, description: string }];

  ngOnInit(): void {
    this.checkRouteParameter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(index: number, item: CardProductModel): string {
    return item.id
  }

  handleSelectedCard(cardProduct: CardProductModel): void {
    this.route.url.pipe(
      takeUntil(this.destroy$),
      map(seg => {
        if (seg.length > 1) {
          this.router.navigate(['/f/catalogo', seg[1].path, 'detalhe', cardProduct.id])
        } else {
          this.router.navigate(['/catalogo/detalhe', cardProduct.id])
        }
      })
    ).subscribe();
  }

  private checkRouteParameter(): void {
    const categorId = this.route.snapshot.paramMap.get('id');
    if (categorId) {
      this.getCatalog(categorId)
    } else {
      this.getCatalog()
    }
  }

  private getCatalog(categoryId?: string, flagActive: boolean = true): void {
    this.catalogService$
      .getCatalog(categoryId, flagActive)
      .pipe(
        takeUntil(this.destroy$),
        map(
          catalogs => this.cardCatalogList = catalogs.map(catalog => (
            {
              id: catalog.id,
              subTitle: catalog.description,
              title: catalog.brand?.name || '',
              urlImage: catalog.image,
              value: catalog.vlrSales,
              attrAltImage: catalog.description
            }))

        )
      )
      .subscribe();
  }
}
