import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperOrderComponent } from './shipper-order.component';

describe('ShipperOrderComponent', () => {
  let component: ShipperOrderComponent;
  let fixture: ComponentFixture<ShipperOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipperOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipperOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
