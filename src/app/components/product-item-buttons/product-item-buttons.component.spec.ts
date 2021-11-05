import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemButtonsComponent } from './product-item-buttons.component';

describe('ProductItemButtonsComponent', () => {
  let component: ProductItemButtonsComponent;
  let fixture: ComponentFixture<ProductItemButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItemButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
