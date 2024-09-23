import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomerComponent } from './order-customer.component';

describe('OrderCustomerComponent', () => {
  let component: OrderCustomerComponent;
  let fixture: ComponentFixture<OrderCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCustomerComponent]
    });
    fixture = TestBed.createComponent(OrderCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
