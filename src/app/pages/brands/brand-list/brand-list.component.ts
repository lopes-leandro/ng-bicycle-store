import { Component, inject, OnInit } from '@angular/core';
import { Brand } from '@models/brand.model';
import { BrandsService } from '@services/brands.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit{
  private brandsService$ = inject(BrandsService);
  
  brands$!: Brand[];
  
  ngOnInit(): void {
    this.getBrands();
  }

  private getBrands():void {
    this.brandsService$.getBrands().subscribe(data => {
      this.brands$ = data;      
    })
  }
}
