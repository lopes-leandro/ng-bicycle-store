import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register'
import { ClarityIcons, userIcon, bicycleIcon, homeIcon, detailsIcon } from '@cds/core/icon';

const icons = [
  userIcon,
  bicycleIcon,
  homeIcon,
  detailsIcon
]
const selector = 'app-header';

@Component({
  selector,
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  constructor() {
    ClarityIcons.addIcons(...icons)
  }
}

@Component({selector, template: ''})
export class HeaderStubComponent implements Partial<HeaderComponent> {}