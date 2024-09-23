import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLookupComponent } from './order-lookup.component';

describe('OrderLookupComponent', () => {
  let component: OrderLookupComponent;
  let fixture: ComponentFixture<OrderLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLookupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
