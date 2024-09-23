import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticClientComponent } from './logistic-client.component';

describe('LogisticClientComponent', () => {
  let component: LogisticClientComponent;
  let fixture: ComponentFixture<LogisticClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogisticClientComponent]
    });
    fixture = TestBed.createComponent(LogisticClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
