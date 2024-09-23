import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { Validators } from '@angular/forms';
import { extend } from 'lodash';
import { BaseComponent } from '../../app/_core/base/base.component';
import { Router } from '@angular/router';
import { common } from '../../app/_core/app.common';

@Component({
  selector: 'app-logistic-client',
  templateUrl: './logistic-client.component.html',
  styleUrls: ['./logistic-client.component.scss']
})
export class LogisticClientComponent extends BaseComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private cdf: ChangeDetectorRef
  ) {
    super();
  }
  email: any;
  isCustomerProfileModal: any = false;
    // isCustomerProfileModal: any = false;
    // isDisplayAddModal: boolean = false; // Cập nhật trạng thái modal đăng nhập
    // CustomerObj: any;
    // loginForm: any;
    // addForm: any;
    // registerForm: any;
    // isLogin: boolean = false;
  async ngOnInit(): Promise<void> {
    

    this.com = new common(this.router);
    this.CustomerObj = this.com.getCustomerObj();
    if (this.CustomerObj != null) {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
    this.loginForm = this.fb.group({
      Email: [null, [Validators.required]],
      Password: [null, [Validators.required]],
    });
    this.addForm = this.fb.group({
      Password: [null, [Validators.required]],
      Email: [],
      ConfirmPass: [null, [Validators.required]],
      CurrentPass: [null, [Validators.required]],
    });
    this.registerForm = this.fb.group({
      Full_name: [null, [Validators.required]],
      Address: [null, [Validators.required]],
      Birth_date: [null, [Validators.required]],
      Email: [null, [Validators.required]]
    });
  }

  modalFooter: any = [{
    label: 'Đóng',
    shape: 'round',
    onClick: () =>
      this.toggleAddModal()
  }]
  modalCustomerProfileFooter: any = [{
    label: 'Đóng',
    shape: 'round',
    onClick: () =>
      this.toggleisCustomerProfileModal()
  },
  {
    label: 'Đăng xuất',
    shape: 'round',
    onClick: () =>
      this.Logout()
  }
  ]
  toggleisCustomerProfileModal() {
    this.isCustomerProfileModal = !this.isCustomerProfileModal;
  }

  Logout() {
    var r = confirm("Bạn có muốn đăng xuất không?");
    if (!r) {
      return;
    }
    this.com = new common(this.router);
    this.CustomerObj = this.com.getCustomerObj();
    this.com.logoutPortal();
    this.CustomerObj = null;
    this.isLogin = false;
    this.toggleisCustomerProfileModal();
  }

  async save() {
    if (this.addForm.valid) {
      var req = this.addForm.value;
      req.Email = this.CustomerObj.Email;
      this.customersServices.changePass(await this.getToken(), req)
        .subscribe((res: any) => {
          if (res.Status == 1) {
            this.toggleisCustomerProfileModal();
            this.toastr.success(res.Message);
          } else {
            this.toastr.warning(res.Message);
          }
        });
    } else {
      Object.values(this.addForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  // async login() {
  //   var req = this.loginForm.value;
  //   if (this.loginForm.valid) {
  //     this.customersServices
  //       .login(await this.getToken(), req)
  //       .subscribe((res: any) => {
  //         if (res.Status == 1) {
  //           this.isLogin = true;
  //           this.CustomerObj = res.Data;
  //           localStorage.setItem('CustomerObj', JSON.stringify(res.Data));
  //           this.handleCancel();
  //           this.toastr.success("Đăng nhập thành công");
  //         } else {
  //           this.toastr.warning(res.Message);
  //         }
  //       });
  //   } else {
  //     Object.values(this.loginForm.controls).forEach((control) => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

  async login() {
    var req = this.loginForm.value;
    this.email = req.Email;
    this.cdf.detectChanges();
    if (this.loginForm.valid) {
      this.customersServices
        .login(await this.getToken(), {email: req.Email, password: req.Password})
        .subscribe((res: any) => {
          if (res.statusCode === 'Success') {
            // Lưu token vào localStorage 
            this.toastr.success("Đăng nhập thành công");
            localStorage.setItem('token', res.token);
            // Chuyển hướng đến trang chủ
            this.router.navigate(['/home']); // Thay '/home' bằng đường dẫn tới trang chủ của bạn
  
            this.isLogin = true;
            this.handleCancel();
          } else {
            this.toastr.warning(res.Message);
          }
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  
  async register() {
    var req = this.registerForm.value;
    var model = {
      firstName: req.Full_name,
      lastName: req.Full_name,
      email: req.Email,
      sdt: "string",
      password: "123"
    }
    if (this.registerForm.valid) {
      this.spinner.show();
      this.customersServices
        .register(model)
        .subscribe((res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.handleCancel();
            this.toastr.success("Đăng ký thành công, Mật khẩu đã được gửi tới email, vui lòng truy cập email");
          } else {
            this.toastr.warning(res.Message);
          }
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
