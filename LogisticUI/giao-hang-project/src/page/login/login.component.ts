import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RequestLogin } from '../../app/_core/model/input/RequestLogin';
import { ResponseLogin } from '../../app/_core/model/output/ResponseLogin';
import { AccService } from '../../service/acc.service';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', 'main.css']
})
export class LoginComponent {
  public requestLogin!: RequestLogin;
  public loginResult!: ResponseLogin;
  
  loginForm = new FormGroup({
    UserName: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private accService: AccService,
    private appService: AppService,
    private http: HttpClient,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
    this.requestLogin = new RequestLogin();
    this.cookieService.deleteAll;
    this.loginResult = new ResponseLogin();
  }

  Ridrect() {
    this.appService.login();
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }

  login() {
    if (this.loginForm.valid) {
      let req = {
        User_name: this.loginForm.value.UserName,
        Password: this.loginForm.value.Password
      };
      this.accService.login(req).subscribe((res: any) => {
        console.log(res);
        if (res.Status == 1) {
          localStorage.setItem('UserInfo', JSON.stringify(res));
          this.appService.login();
        } else {
          this.toastr.error(res.Message, 'Tác vụ thất bại');
          localStorage.removeItem('UserInfo');
        }
      });
    } else {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin', 'Tác vụ thất bại');
    }
  }
}
