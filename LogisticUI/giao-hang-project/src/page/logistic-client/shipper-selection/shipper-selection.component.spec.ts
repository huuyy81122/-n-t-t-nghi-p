import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperSelectionComponent } from './shipper-selection.component';

describe('ShipperSelectionComponent', () => {
  let component: ShipperSelectionComponent;
  let fixture: ComponentFixture<ShipperSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipperSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipperSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
