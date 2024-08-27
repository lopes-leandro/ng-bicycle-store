import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductModel } from './card-product-model';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProductComponent {
  @Input() item!: CardProductModel;

  @Output() onHandleClick = new EventEmitter<CardProductModel>

  onItemClick(event: CardProductModel): void {
    this.onHandleClick.emit(event);
  }
}
