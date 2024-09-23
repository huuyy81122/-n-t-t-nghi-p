import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStatusComponent } from './common-status.component';

describe('CommonStatusComponent', () => {
  let component: CommonStatusComponent;
  let fixture: ComponentFixture<CommonStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonStatusComponent]
    });
    fixture = TestBed.createComponent(CommonStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
