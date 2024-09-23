import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { AppInjector } from '../../../module/app.module';
import { common } from '../app.common';
import { ResponseLogin } from '../model/output/ResponseLogin';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { endOfMonth } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';

// new

import { CustomersServices } from '../../services/customers.service';
import { TransportTypeServices } from '../../services/transport-type.service';
import { ServiceTypeServices } from '../../services/service-type.service';
import { PriceServices } from '../../services/price.service';
import { OrderServices } from '../../services/order.service';
import { OrderStatusService } from '../../services/order-status.service';
import { ReportServices } from '../../services/report.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  public chart: any;
  router: Router;
  spinner: NgxSpinnerService;
  toastr: ToastrService;
  modal: NzModalService;
  isFilter: any = true;
  dataGetList: any;
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  titleModal: string = '';
  dataMoTa: any = 'Mô tả phòng';
  checkInsert: boolean = false;
  ID: any;
  donViData: any = [];
  check: any;
  selectedValue = null;
  registerForm!: UntypedFormGroup;
  messageService!: NzMessageService;

  listRegisterDetail: any;
  fb: UntypedFormBuilder;

  isLogin: boolean = false;
  
  CustomerObj: any;

  /// new
  customersServices: CustomersServices;
  transportTypeServices: TransportTypeServices;
  serviceTypeServices: ServiceTypeServices;
  priceServices: PriceServices;
  orderServices: OrderServices;
  orderStatusService: OrderStatusService;
  reportServices: ReportServices;

  //////
  searchString: any = '';

  
  constructor() {
    this.fb = AppInjector.get(UntypedFormBuilder);
    this.router = AppInjector.get(Router);
    this.spinner = AppInjector.get(NgxSpinnerService);
    this.toastr = AppInjector.get(ToastrService);
    this.modal = AppInjector.get(NzModalService);
    this.messageService = AppInjector.get(NzMessageService);
    //// new  
    this.customersServices = AppInjector.get(CustomersServices);
    this.serviceTypeServices = AppInjector.get(ServiceTypeServices);
    this.transportTypeServices = AppInjector.get(TransportTypeServices);
    this.priceServices = AppInjector.get(PriceServices);
    this.orderServices = AppInjector.get(OrderServices);
    this.orderStatusService = AppInjector.get(OrderStatusService);
    this.reportServices = AppInjector.get(ReportServices);
  }

  currentPage: any = 1;
  arrNumberPage: any = [];
  arrNumberPage_chil: any = [];
  numberPage: any;
  page: any = 1;
  pageSize: any = 10;
  pageSizes: any = [10, 20, 50, 100, 200, 500, 1000];
  dataTable: any;
  getNull = false;
  totalItem!: number;
  totalItemFilter: any;
  isDisplay: boolean = true;
  submitted = false;
  closeResult!: string;
  dataPopup: any = {};
  com!: common;
  Token: any;
  count: any = 0;
  isDisplayAddModal: boolean = false;
  EditModal: boolean = false;
  isDisplayEditModal: boolean = false;
  isDisplayDelete: boolean = false;
  isDisplayFile: boolean = false;
  addForm!: UntypedFormGroup;
  loginForm!: UntypedFormGroup;
  RegisterForm!: UntypedFormGroup;
  searhForm!: UntypedFormGroup;
  eyeForm!: UntypedFormGroup;
  isDetail: any = false;
  isGuest: any = false;
  checked = false;
  loading = false;
  indeterminate = false;
  dateRange!: [Date, Date];

  Loai_dinh_kem: any;
  ID_nguon: any;
  openDeleteModal(id: any) {
    this.ID = id;
    this.isDisplayDelete = true;
  }
  openFileModal(ID: any) {
    this.ID= ID;
    this.isDisplayFile = true;
  }

  toggleFileModal() {
    this.isDisplayFile = !this.isDisplayFile
  }

  toggleAddModal() {
    this.isDisplayAddModal = !this.isDisplayAddModal
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  toogleisDisplayAddModal()
  {
    this.isDisplayAddModal= !this.isDisplayAddModal;
  }
  toggleisDisplayDelete()
  {
    this.isDisplayDelete= !this.isDisplayDelete;
  }

  buttonFilter() {
    this.isDisplay = !this.isDisplay;
  }

  getLinhVuc(id: number) {
    var name = '';
    switch (id) {
      case 1: {
        name = 'Khoa học tự nhiên';
        break;
      }
      case 2: {
        name = 'Khoa học kỹ thuật và công nghệ';
        break;
      }
      case 3: {
        name = 'Công nghệ nano';
        break;
      }
      case 4: {
        name = 'Khoa học y, dược';
        break;
      }
      case 5: {
        name = 'Khoa học nông nghiệp';
        break;
      }
      case 6: {
        name = 'Khoa học xã hội';
        break;
      }
      default: {
        name = 'Khoa học nhân văn';
        break;
      }
    }
    return name;
  }

  createNumberPage(totalItem: any, pageSize: any) {
    let numberPage = 0;
    let arrNumberPage = [];
    if (totalItem % pageSize == 0) {
      numberPage = Math.floor(totalItem / pageSize);
    } else {
      numberPage = Math.floor(totalItem / pageSize) + 1;
    }
    for (var i = 1; i <= numberPage; i++) {
      arrNumberPage.push(i);
    }
    let arrNumberPage_chil = [];
    if (arrNumberPage.length > 4) {
      for (var i = 1; i <= 4; i++) {
        arrNumberPage_chil.push(i);
      }
    } else {
      arrNumberPage_chil = arrNumberPage;
    }
    return {
      numberPage: numberPage,
      arrNumberPage_chil: arrNumberPage_chil,
    };
  }

  handlePageChange(event: any) {
    if (event == 'pre') {
      this.page = this.page - 1;
    } else if (event == 'next') {
      this.page = this.page + 1;
    } else {
      this.page = event;
      this.arrNumberPage_chil = [];
      for (var i = event - 3; i <= event + 3; i++) {
        if (i > 0 && i <= this.numberPage) {
          this.arrNumberPage_chil.push(i);
        }
      }
    }
  }

  getStringId(m: any) {
    var rs = '';
    for (var k = 0; k < m.length; k++) {
      if (k == 0) {
        rs += m[k];
      } else {
        rs += ',' + m[k];
      }
    }
    return rs;
  }

  remove_sign(str: string) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
    return str;
  }

  async getInfor(): Promise<any> {
    let infor: ResponseLogin | null;
    this.com = new common(this.router);
    this.com.CheckLogin();
    infor = this.com.getUserinfo();
    return await infor;
  }

  async getToken() {
    let token = (await this.getInfor()).Message;
    return token?.length > 0 ? token : null;
  }

  async sortElementByFeild(listAray: [], field: []) {
    _.sortBy(listAray, field);
    return listAray;
  }

  compareString(str1: any, str2: any) {
    if (
      this.remove_sign(str1.toString())
        .trim()
        .includes(this.remove_sign(str2.toString().trim()))
    )
      return true;
    return false;
  }

  handleCancel() {
    this.isDisplayAddModal = false;
  }

  reload() {
    window.location.reload();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    listOfCurrentPageData = this.dataTable ?? [];
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean, key: any): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach((el: any) => {
        this.updateCheckedSet(el[key], checked);
      });
    this.refreshCheckedStatus();
  }



  handleChangeUpload(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.messageService.success(
        `${info.file.name} file uploaded successfully`
      );
    } else if (info.file.status === 'error') {
      this.messageService.error(`${info.file.name} file upload failed.`);
    }
  }
}
