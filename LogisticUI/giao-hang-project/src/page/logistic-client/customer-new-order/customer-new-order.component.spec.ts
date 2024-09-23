import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNewOrderComponent } from './customer-new-order.component';

describe('CustomerNewOrderComponent', () => {
  let component: CustomerNewOrderComponent;
  let fixture: ComponentFixture<CustomerNewOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerNewOrderComponent]
    });
    fixture = TestBed.createComponent(CustomerNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
