import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreFilterComponent } from './card-pre-filter.component';

describe('CardPreFilterComponent', () => {
  let component: CardPreFilterComponent;
  let fixture: ComponentFixture<CardPreFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardPreFilterComponent]
    });
    fixture = TestBed.createComponent(CardPreFilterComponent);
    component = fixture.componentInstance;
    component.item = {id:-1, image: '', title: 'Card Test'}
    fixture.detectChanges();
  });

  it('should create', () => {    
    expect(component).toBeTruthy();
  });
});
