import { Component, OnInit, } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';
import { AppInjector } from '../../../module/app.module';
import { TestService } from './test.service';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit {


  breadCrumbs = [
    {
      name: 'Trang chủ',
      routerLink: '/',
      active: true,
      icon: 'fas fa-home',
    },
    {
      name: 'Test',
      routerLink: '',
      active: false,
      icon: ''
    },
  ];

  testService: TestService;

  constructor(
  ) {
    super();
    this.testService = AppInjector.get(TestService);
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }


}
