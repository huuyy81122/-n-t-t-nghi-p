import { Component } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss']
})
export class LoginCustomerComponent extends BaseComponent{
  constructor() {
    super();
  }

  Login()
  {
    window.alert("aaa")
    this.isLogin= true;
    this.CustomerObj={
      Full_name: "Nguyễn Văn A Tuấn "
    }
  }
}
