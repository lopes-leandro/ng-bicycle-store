import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

const selector = 'app-vertical-nav';
@Component({
  selector,
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalNavComponent {}

@Component({selector, template: ''})
export class VerticalNavStubComponent implements Partial<VerticalNavComponent> {}