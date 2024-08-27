import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CardPreFilterModel } from './card-pre-filter-model';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-card-pre-filter',
  standalone: true,
  imports: [NgIf, NgFor, ClarityModule],
  templateUrl: './card-pre-filter.component.html',
  styleUrls: ['./card-pre-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPreFilterComponent {

  @Input() item!: CardPreFilterModel
  @Output() onHandleClick = new EventEmitter<CardPreFilterModel>

  onItemClick(event: CardPreFilterModel): void {
    this.onHandleClick.emit(event);
  }
}
