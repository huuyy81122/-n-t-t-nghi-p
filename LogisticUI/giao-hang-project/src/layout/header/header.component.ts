import { AppConfiguration } from './../../configuration';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../service/app.service';
import { AccService } from '../../service/acc.service';
import { ResponseLogin } from '../../app/_core/model/output/ResponseLogin';
import { AppConfig } from '../../configuration';
import { common } from '../../app/_core/app.common';
import { AppInjector } from '../../module/app.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  [x: string]: any;
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  public searchForm!: FormGroup;
  com!: common
  fb: UntypedFormBuilder;
  addForm!: UntypedFormGroup;
  accService: AccService;
  constructor(
    @Inject(AppConfig)
    private readonly appConfig: AppConfiguration,
    private appService: AppService,
    private spinner: NgxSpinnerService,
    public router: Router,
    private toastr: ToastrService,
  ) {
    this.fb = AppInjector.get(UntypedFormBuilder);
    this.accService = AppInjector.get(AccService);
   }
  ngOnInit() {
    this.com = new common(this.router);
    var User = this.com.getUserinfo();
    this['UserName'] = User.Data.User_name ?? '';
    this.com.CheckLogin();
    var UserData = this.com.getUserinfo();
    this['Token'] = UserData.Message ?? '';

    this.addForm = this.fb.group({
      Password: [null, [Validators.required]],
      ConfirmPass: [null, [Validators.required]],
      CurrentPass: [null, [Validators.required]],
    });
  }

  logout() {
    this.appService.logout();
  }

  isDisplayChangePassModal: any = false;
  toggleisDisplayChangePassModal() 
  {
    this.isDisplayChangePassModal= !this.isDisplayChangePassModal;
   }
  async save()
   {
    if (this.addForm.valid) {
      this.accService.changePass(this.addForm.value.CurrentPass,this.addForm.value.Password,this.addForm.value.ConfirmPass,await this.getToken(), await this.getUserID())
        .subscribe((res: any) => {
          if (res.Status == 1) {
            this.toggleisDisplayChangePassModal();
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

   async getToken() {
    let token = (await this.getInfor()).Message;
    return token.length > 0 ? token : null;
  }
  async getUserID() {
    let User_id = (await this.getInfor()).Data.User_id;
    return User_id;
  }
  async getInfor(): Promise<any> {
    let infor: ResponseLogin | null;
    this.com = new common(this.router);
    this.com.CheckLogin();
    infor = this.com.getUserinfo();
    return await infor;
  }
}
