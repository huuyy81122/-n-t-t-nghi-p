import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFileComponent } from './common-file.component';

describe('CommonFileComponent', () => {
  let component: CommonFileComponent;
  let fixture: ComponentFixture<CommonFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonFileComponent]
    });
    fixture = TestBed.createComponent(CommonFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
