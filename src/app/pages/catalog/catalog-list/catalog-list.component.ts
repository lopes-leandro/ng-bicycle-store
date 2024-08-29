import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { TitleComponent } from '@components/title/title.component';
import { CardProductComponent } from '@components/card-product/card-product.component';
import { ClarityModule } from '@clr/angular';
import { CardProductModel } from '@components/card-product/card-product-model';
import { Product } from '@models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '@services/catalog.service';
import { map, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface ProductDataModel {
  idProduct: number;
  brand: string;
  title: string;
  price: number;
  urlImage: string;
  idCategory: number;
}
interface CategoriaModel {
  id: number;
  description: string;
}
interface MarcaModel {
  id: number;
  description: string;
}
interface FilterItemModel {
  id: number;
  description: string;

}
type ProductsFilterListModel = {
  title: string;
  itens: CategoriaModel[] | MarcaModel[]
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

  private categoryId!: string;
  cardProductList!: CardProductModel[];
  selection!: [{ id: number, description: string }];

  dataFilterList: ProductsFilterListModel[] = [
    {
      title: 'Categorias',
      itens: [
        { id: 10, description: 'Acessórios' },
        { id: 20, description: 'Alavancas' },
        { id: 30, description: 'Amortecedores' },
        { id: 40, description: 'Avanços' },
        { id: 50, description: 'Movimento Central' },
        { id: 60, description: 'Clips Pedal' },
        { id: 70, description: 'Freios' },
        { id: 80, description: 'Suportes de Garrafa' },
        { id: 90, description: 'Garfos' },
      ]
    },
    {
      title: 'Marcas',
      itens: [
        { id: 1, description: 'Cannondale' },
        { id: 2, description: 'BBB' },
        { id: 3, description: 'Ergon' },
        { id: 4, description: 'Zefal' },
        { id: 5, description: 'SunRace' },
        { id: 6, description: 'Magura' },
        { id: 7, description: 'Ventura' },
        { id: 8, description: 'Campagnolo' },
        { id: 9, description: 'SR Suntour' },
        { id: 10, description: 'DVO' },
        { id: 11, description: 'DT Swiss' },
        { id: 12, description: 'KCNC' },
        { id: 13, description: 'Ergotec' },
        { id: 14, description: 'FSA' },
        { id: 15, description: 'Ceramicspeed' },
        { id: 16, description: 'Look' },
        { id: 17, description: 'Cranckbrothers' },
        { id: 18, description: 'Vision' },
        { id: 19, description: 'XLC' },
        { id: 20, description: 'Elite' },
        { id: 21, description: 'SKS' },
        { id: 22, description: 'Classified' },
        { id: 23, description: 'Ritchey' },
        { id: 24, description: 'Rotor' },
        { id: 25, description: 'Shimano' },
        { id: 26, description: 'Bosh' },
        { id: 27, description: 'Giant' },
        { id: 28, description: 'Favero' },
        { id: 29, description: 'E-thirteen' },
      ]
    }
  ]

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

  checkedItemFilter(event: CategoriaModel | MarcaModel): void {
    console.log(event);
    // this.productsList = this.dataProductsList
    //   // .filter(f => (f.category.id === 10))
    //   .map(m => (
    //     {
    //       id: m.id,
    //       subTitle: m.brand.name,
    //       title: m.description,
    //       urlImage: m.image,
    //       value: m.vlrSales
    //     }
    //   ))
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
    this.route.params.pipe(
      takeUntil(this.destroy$),
      map(params => {
        if (params['id']) {
          this.categoryId = params['id'];
          this.getProductByPreFilter();
        } else {
          this.getProducts()
        }
      })
    ).subscribe()
  }

  private getProductByPreFilter(): void {
    this.catalogService$.getProductsByCategoryId(this.categoryId)
      .pipe(
        takeUntil(this.destroy$),
        map(
          productsApi => {
            this.cardProductList = [
              ...productsApi.map(
                m => (
                  {
                    id: m.id,
                    subTitle: m.brandId,
                    title: m.description,
                    value: m.vlrSales,
                    urlImage: m.image,
                    attrAltImage: m.description
                  }
                )
              )
            ]
          }
        )
      ).subscribe();
  }

  private getProducts(): void {
    this.catalogService$
      .getProducts()
      .pipe(
        takeUntil(this.destroy$),
        map(
          productsApi =>
            this.cardProductList = [
              ...productsApi.map(
                m => (
                  {
                    id: m.id,
                    subTitle: m.brandId,
                    title: m.description,
                    value: m.vlrSales,
                    urlImage: m.image,
                    attrAltImage: m.description
                  }
                )
              )
            ]
        )
      )
      .subscribe();
  }
}
