import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BangGiaComponent } from './bang-gia.component';

describe('BangGiaComponent', () => {
  let component: BangGiaComponent;
  let fixture: ComponentFixture<BangGiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BangGiaComponent]
    });
    fixture = TestBed.createComponent(BangGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
