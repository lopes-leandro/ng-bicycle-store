import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register'
import { ClarityIcons, userIcon, bicycleIcon, homeIcon, detailsIcon } from '@cds/core/icon';
import { RouterModule } from '@angular/router';
import { BasketService } from '@services/basket.service';
import { map } from 'rxjs';

const icons = [
  userIcon,
  bicycleIcon,
  homeIcon,
  detailsIcon,
]
const selector = 'app-header';

@Component({
  selector,
  standalone: true,
  imports: [CommonModule, ClarityModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  private basketService = inject(BasketService);

  badgeCount = 0;

  ngOnInit(): void {
    ClarityIcons.addIcons(...icons)

    this.basketService.currentBasketCount.subscribe(count => {
      this.badgeCount = count;
    });
  }
}

@Component({ selector, template: '' })
export class HeaderStubComponent implements Partial<HeaderComponent> { }