import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { Brand } from '@models/brand.model';
import { CategoryView } from '@models/categories';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  products$!: Product[];

  ngOnInit(): void {
    this.products$ = [
      {
        id: 10001,
        description: 'Cassete Titânio MBT 11s',
        active: true,
        brand: { id: 1001, name: 'Kcnc' },
        category: { id: 1001, name: 'Cassetes' },
        quantity: 10,
        vlrPurchase: 320.52,
        vlrSales: 968.9,
        image: '',
        dtCreation: new Date().toISOString()
      }
    ];

  }
}
