import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { CardPreFilterModel } from '@components/card-pre-filter/card-pre-filter-model';
import { CardPreFilterComponent } from '@components/card-pre-filter/card-pre-filter.component';
import { TitleComponent } from '@components/title/title.component';
import { Catalog } from '@models/catalog.model';
import { CatalogService } from '@services/catalog.service';
import { map, Subject, Subscription, takeUntil } from 'rxjs';

interface GroupProductFilter {
  img: string;
  title: string;
  url: string;
  idGroup: number
}

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, ClarityModule, CardPreFilterComponent, TitleComponent],
})
export class CatalogFilterComponent implements OnInit, OnDestroy {

  private readonly catalogService$ = inject(CatalogService);
  private readonly router = inject(Router);
  private destroy$ = new Subject<void>();

  private readonly cardPreFilterItem: CardPreFilterModel = {
    id: '-1',
    title: 'Todos os produtos',
    image: 'https://via.placeholder.com/141x120'
  }
  cardPreFilterList: CardPreFilterModel[] = [];

  ngOnInit(): void {
    this.catalogService$
      .getCatalogPreFilter()
      .pipe(
        takeUntil(this.destroy$),
        map(
          cagalogsPreFilter => {
            this.cardPreFilterList = cagalogsPreFilter.map(catalog => (
              {
                id: catalog.id,
                image: catalog.image,
                title: catalog.description
              }));
            this.cardPreFilterList = [...this.cardPreFilterList, this.cardPreFilterItem];
          }
        )
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(index: number, card: CardPreFilterModel): string {
    return card.id
  }

  onHandleSelectedFilter(card: CardPreFilterModel): void {
    if (card.id !== '-1') {
      this.router.navigate(['/f/catalogo', card.id]);
    } else {
      this.router.navigate(['/catalogo']);
    }
  }
}
