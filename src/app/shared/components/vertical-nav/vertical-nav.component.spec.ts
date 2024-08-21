import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerticalNavComponent } from './vertical-nav.component';

enum VERTICAL_NAV {
  CATALOG = 'Catálogo',
  STOCK = 'Estoque',
  ORDERS = 'Pedidos'
}

describe('VerticalNavComponent', () => {
  let component: VerticalNavComponent;
  let fixture: ComponentFixture<VerticalNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VerticalNavComponent]
    });
    fixture = TestBed.createComponent(VerticalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render link ${VERTICAL_NAV.CATALOG}`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navItem = compiled.querySelectorAll('.nav-link span')[0];
    expect(navItem?.textContent).toContain(VERTICAL_NAV.CATALOG);
  });

  it(`should render link ${VERTICAL_NAV.STOCK}`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navItem = compiled.querySelectorAll('.nav-link span')[1];
    expect(navItem?.textContent).toContain(VERTICAL_NAV.STOCK);
  });

  it(`should render link ${VERTICAL_NAV.ORDERS}`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navItem = compiled.querySelectorAll('.nav-link span')[2];
    expect(navItem?.textContent).toContain(VERTICAL_NAV.ORDERS);
  });
});
