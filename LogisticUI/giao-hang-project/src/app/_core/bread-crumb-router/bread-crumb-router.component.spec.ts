import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbRouterComponent } from './bread-crumb-router.component';

describe('BreadCrumbRouterComponent', () => {
  let component: BreadCrumbRouterComponent;
  let fixture: ComponentFixture<BreadCrumbRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadCrumbRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadCrumbRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
