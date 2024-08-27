import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { NgxMaskPipe } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { BasketService } from '@services/basket.service';

@Component({
  selector: 'app-catalog-detail',
  standalone: true,
  imports: [CommonModule, ClarityModule, FormsModule, NgxMaskPipe, RouterModule],
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.scss']
})
export class CatalogDetailComponent {
  private basketService = inject(BasketService);

  count = 1;
  isDisabledMinimus = true;
  increment() {
    this.count++;
    if (this.count > 1) {
      this.isDisabledMinimus = false
    }
  }

  decrement() {
    this.count--;
    if (this.count <= 1) {
      this.isDisabledMinimus = true
    }
  }

  handleAddBasket() {
    this.basketService.updateBasketCount(this.count);
  }
  
  sampleImage = 'data:image/webp;base64,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'
}
