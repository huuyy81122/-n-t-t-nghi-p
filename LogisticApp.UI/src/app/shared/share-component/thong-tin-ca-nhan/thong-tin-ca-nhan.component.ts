import { DatePipe } from '@angular/common';
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from './../../../services/api/tuyen-sinh-thi-sinh-dang-ky.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/utils/jwt';
interface City {
  name: string;
  idQuocTich: any;
}
interface GioiTinh {
  gioiTinh: string;
  idGioiTinh: number;
}
interface Tinh{
  idTinh: string,
  tenTinh: string
}
interface DanToc{
  idDanToc: number,
  danToc: string
}
interface Huyen{
  idHuyen: string,
  tenHuyen: string
}
interface Xa{
  idXa: string,
  tenXa: string
}
interface DoiTuongTS{
  idDoiTuongTs: number,
  tenDoiTuong: string
}
interface KhuVuc{
  idKhuVuc: number,
  tenKhuVuc: string
}
interface TruongTHPT{
  idTruongTHPT: number,
  tenTruongTHPT: string
}
interface XepLoaiHocTap{
  idXepLoaiHocTap: number,
  xepLoaiHocTap: string
}
interface XepLoaiHanhKiem{
  idXepLoaiHanhKiem: number,
  xepLoaiHanhKiem: string
}
@Component({
  selector: 'thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: ['./thong-tin-ca-nhan.component.scss']
})
export class ThongTinCaNhanComponent implements OnInit, OnChanges {
  @Input() dataThongTinCaNhan: any;
  formThongTin : any;
  submitted: any;
  cities: City[] | undefined;
  gioiTinh: GioiTinh[] | undefined;
  tinhs:  Tinh[] |undefined;
  danTocs: DanToc[] | undefined;
  huyens: Huyen[] | undefined;
  xas: Xa[] | undefined;
  doiTuongs: DoiTuongTS[] | undefined;
  khuVucs: KhuVuc[] | undefined;
  truongs: TruongTHPT[] | undefined;
  loaiHocTap: XepLoaiHocTap[] | undefined;
  loaiHanhKiem: XepLoaiHanhKiem[] | undefined;
  selectedCity: City | undefined;
  disabledInput: boolean = true;
  constructor(private fb: FormBuilder,  private datePipe: DatePipe, private tokenServices: TokenService, private tuyenSinhThiSinhDangKyXetTuyenApiService: TuyenSinhThiSinhDangKyXetTuyenApiService){
    this.formThongTin = this.fb.group({
      hoTen: [null, Validators.required],
      gioiTinh: [null, Validators.required],
      ngaySinh: [null, Validators.required],
      noiSinh: [null, Validators.required],
      quocTich: [null, Validators.required],
      danToc: [null, Validators.required],
      cmnd: [null, Validators.required],
      ngayCap: [null, Validators.required],
      noiCap: [null, Validators.required],
      tinh: [null, Validators.required],
      huyen: [null, Validators.required],
      xa: [null, Validators.required],
      diaChiTt: [null, Validators.required],
      tt18: [false],
      kk18: [false],
      dienThoaiCaNhan: [null, Validators.required],
      email: [null, Validators.required],
      diaChiBaoTin: [null, Validators.required],
      hoTenBo: [null],
      namSinhBo: [null],
      sdtBo: [null],
      hoTenMe: [null],
      namSinhMe: [null],
      sdtMe: [null],
      doiTuongChinhSach: [null],
      khuVucUuTien: [null],
      tinh10: [null],
      truong10: [null, Validators.required],
      tinh11: [null],
      truong11: [null, Validators.required],
      tinh12: [null],
      truong12: [null, Validators.required],
      hocTap12: [null, Validators.required],
      hanhKiem12: [null, Validators.required],
      namTotNghiep: [null],
      sbd: [null]

    })
  }
  ngOnInit(): void {
    this.initData();
  }
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // Kiểm tra nếu input dataThongTinCaNhan đã thay đổi
    if (changes.dataThongTinCaNhan) {
      // Cập nhật dữ liệu trong component con khi dữ liệu trong component cha thay đổi
      this.dataThongTinCaNhan = changes.dataThongTinCaNhan.currentValue;
      this.initData();
    }
  }
  checkValid(): any {
    this.submitted = true;
    if (this.formThongTin.valid) {
      return true;
    } else {
      this.formThongTin.markAllAsTouched();
      return false;
    }
  }
  getData(): any {
    return {
      hoTen: this.formThongTin.get('hoTen')?.value,
      ngaySinh: this.formThongTin.get('ngaySinh')?.value,
      idGioiTinh: this.formThongTin.get('gioiTinh')?.value,
      idQuocTich: this.formThongTin.get('quocTich')?.value,
      idDanToc: this.formThongTin.get('danToc')?.value,
      idTinhNs: this.formThongTin.get('noiSinh')?.value,
      cmnd: this.formThongTin.get('cmnd')?.value,
      ngayCapCMND: this.formThongTin.get('ngayCap')?.value,
      idNoiCapCMND: this.formThongTin.get('noiCap')?.value,
      idTinhTt: this.formThongTin.get('tinh')?.value,
      idHuyenTt: this.formThongTin.get('huyen')?.value,
      xaPhuongTt: this.formThongTin.get('xa')?.value,
      diaChiTt: this.formThongTin.get('diaChiTt')?.value,
      hoKhauTtKv1: this.formThongTin.get('tt18')?.value,
      hoKhauTtXaKhoKhan: this.formThongTin.get('kk18')?.value,
      dienThoaiCaNhan: this.formThongTin.get('dienThoaiCaNhan')?.value,
      email: this.formThongTin.get('email')?.value,
      diaChiBaoTin: this.formThongTin.get('diaChiBaoTin')?.value,
      hoTenCha: this.formThongTin.get('hoTenBo')?.value,
      namSinhCha: this.formThongTin.get('namSinhBo')?.value,
      soDienThoaiBo: this.formThongTin.get('sdtBo')?.value,
      hoTenMe: this.formThongTin.get('hoTenMe')?.value,
      namSinhMe: this.formThongTin.get('namSinhMe')?.value,
      soDienThoaiMe: this.formThongTin.get('sdtMe')?.value,
      idDoiTuongTS: this.formThongTin.get('doiTuongChinhSach')?.value,
      idKhuVucTuyenSinh: this.formThongTin.get('khuVucUuTien')?.value,
      idTruongTHPTLop10: this.formThongTin.get('truong10')?.value,
      idTruongTHPTLop11: this.formThongTin.get('truong11')?.value,
      idTruongTHPTLop12: this.formThongTin.get('truong12')?.value,
      idXepLoaiHocTapLop12: this.formThongTin.get('hocTap12')?.value,
      idXepLoaiHanhKiemLop12: this.formThongTin.get('hanhKiem12')?.value,
      namTotNghiep: this.formThongTin.get('namTotNghiep')?.value,
      sbd: this.formThongTin.get('sbd')?.value
    };
  }
  initData() :void {
    var user = this.tokenServices.decodeToken();
    console.log(user);
    this.formThongTin.get('hoTen')?.setValue(user?.name);
    this.formThongTin.get('email')?.setValue(user?.email);
    this.formThongTin.get('dienThoaiCaNhan')?.setValue(user?.sdt);
    this.formThongTin.get('cmnd')?.setValue(user?.cccd);
    this.formThongTin.get('cmnd').disable();
    this.formThongTin.get('ngaySinh')?.setValue(this.dataThongTinCaNhan?.ngaySinh);
    this.formThongTin.get('gioiTinh')?.setValue(this.dataThongTinCaNhan?.idGioiTinh);
    this.formThongTin.get('quocTich')?.setValue(this.dataThongTinCaNhan?.idQuocTich);
    this.formThongTin.get('danToc')?.setValue(this.dataThongTinCaNhan?.idDanToc);
    this.formThongTin.get('noiSinh')?.setValue(this.dataThongTinCaNhan?.idTinhNs);
    this.formThongTin.get('ngayCap')?.setValue(this.dataThongTinCaNhan?.ngayCapCMND);
    this.formThongTin.get('noiCap')?.setValue(this.dataThongTinCaNhan?.idNoiCapCMND);
    this.formThongTin.get('tinh')?.setValue(this.dataThongTinCaNhan?.idTinhTt);
    this.formThongTin.get('huyen')?.setValue(this.dataThongTinCaNhan?.idHuyenTt);
    this.formThongTin.get('xa')?.setValue(this.dataThongTinCaNhan?.xaPhuongTt);
    this.formThongTin.get('diaChiTt')?.setValue(this.dataThongTinCaNhan?.diaChiTt);
    this.formThongTin.get('tt18')?.setValue(this.dataThongTinCaNhan?.hoKhauTtKv1);
    this.formThongTin.get('kk18')?.setValue(this.dataThongTinCaNhan?.hoKhauTtXaKhoKhan);
    this.formThongTin.get('diaChiBaoTin')?.setValue(this.dataThongTinCaNhan?.diaChiBaoTin);
    this.formThongTin.get('hoTenBo')?.setValue(this.dataThongTinCaNhan?.hoTenCha);
    this.formThongTin.get('namSinhBo')?.setValue(this.dataThongTinCaNhan?.namSinhCha);
    this.formThongTin.get('sdtBo')?.setValue(this.dataThongTinCaNhan?.soDienThoaiBo);
    this.formThongTin.get('hoTenMe')?.setValue(this.dataThongTinCaNhan?.hoTenMe);
    this.formThongTin.get('namSinhMe')?.setValue(this.dataThongTinCaNhan?.namSinhMe);
    this.formThongTin.get('sdtMe')?.setValue(this.dataThongTinCaNhan?.soDienThoaiMe);
    this.formThongTin.get('doiTuongChinhSach')?.setValue(this.dataThongTinCaNhan?.idDoiTuongTS);
    this.formThongTin.get('khuVucUuTien')?.setValue(this.dataThongTinCaNhan?.idKhuVucTuyenSinh);
    this.formThongTin.get('truong10')?.setValue(this.dataThongTinCaNhan?.idTruongTHPTLop10);
    this.formThongTin.get('truong11')?.setValue(this.dataThongTinCaNhan?.idTruongTHPTLop11);
    this.formThongTin.get('truong12')?.setValue(this.dataThongTinCaNhan?.idTruongTHPTLop11);
    this.formThongTin.get('hocTap12')?.setValue(this.dataThongTinCaNhan?.idXepLoaiHocTapLop12);
    this.formThongTin.get('hanhKiem12')?.setValue(this.dataThongTinCaNhan?.idXepLoaiHanhKiemLop12);
    this.formThongTin.get('namTotNghiep')?.setValue(this.dataThongTinCaNhan?.namTotNghiep);
    this.formThongTin.get('sbd')?.setValue(this.dataThongTinCaNhan?.sbd);

    this.cities = [
      { name: 'Việt Nam', idQuocTich: 1 },
      { name: 'Trung Quốc', idQuocTich: 2 },
      { name: 'Lào', idQuocTich: 3 },
      { name: 'Thái Lan', idQuocTich: 4 },
      { name: 'Pháp', idQuocTich: 5 }
    ];
    this.gioiTinh = [{gioiTinh: "Nam", idGioiTinh: 1}, {gioiTinh: "Nữ", idGioiTinh: 2}, {gioiTinh: "Khác", idGioiTinh: 3}];
    this.tinhs = [
      { idTinh: '01', tenTinh: 'Hà Nội' },
      { idTinh: '02', tenTinh: 'TP Hồ Chí Minh' },
      { idTinh: '03', tenTinh: 'Đà Nẵng' },
      { idTinh: '04', tenTinh: 'Hải Phòng' },
      { idTinh: '19', tenTinh: 'Cần Thơ' },
      { idTinh: '20', tenTinh: 'Bạc Liêu' }
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'DanToc' interface
    this.danTocs = [
      { idDanToc: 1, danToc: 'Kinh' },
      { idDanToc: 2, danToc: 'Tày' },
      { idDanToc: 3, danToc: 'HMông' },
      { idDanToc: 4, danToc: 'Dao' },
      { idDanToc: 19, danToc: 'Khơ Me' },
      { idDanToc: 20, danToc: 'Chăm' }
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'Huyen' interface
    this.huyens = [
      { idHuyen: "01", tenHuyen: 'Thanh Xuân' },
      { idHuyen: "02", tenHuyen: 'Hoàng Mai' },
      { idHuyen: "03", tenHuyen: 'Đống Đa' },
      { idHuyen: "'04", tenHuyen: 'Ba Đình' },
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'Xa' interface
    this.xas= [
      { idXa: "1", tenXa: 'Phường Định Công' },
      { idXa: "2", tenXa: 'Phường Mai Động' },
      { idXa: "3", tenXa: 'Phường Trung Hoà' },
      { idXa: "4", tenXa: 'Phường Yên Hoà' },
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'DoiTuongTS' interface
    this.doiTuongs = [
      { idDoiTuongTs: 1, tenDoiTuong: 'Học sinh giỏi' },
      { idDoiTuongTs: 2, tenDoiTuong: 'Học sinh nghèo' },
      { idDoiTuongTs: 3, tenDoiTuong: 'Người có công với cách mạng' },
      { idDoiTuongTs: 4, tenDoiTuong: 'Thương binh' },
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'KhuVuc' interface
    this.khuVucs = [
      { idKhuVuc: 1, tenKhuVuc: 'Khu vực 1' },
      { idKhuVuc: 2, tenKhuVuc: 'Khu vực 2' },
      { idKhuVuc: 3, tenKhuVuc: 'Khu vực 3' },
      { idKhuVuc: 4, tenKhuVuc: 'Khu vực 4' },
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'TruongTHPT' interface
    this.truongs = [
      { idTruongTHPT: 1, tenTruongTHPT: 'Trường THPT Chuyên Hà Nội' },
      { idTruongTHPT: 2, tenTruongTHPT: 'Trường THPT Phan Đình Phùng' },
      { idTruongTHPT: 3, tenTruongTHPT: 'Trường THPT Nguyễn Huệ' },
      { idTruongTHPT: 4, tenTruongTHPT: 'Trường THPT Lương Thế Vinh' },
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'XepLoaiHocTap' interface
    this.loaiHocTap = [
      { idXepLoaiHocTap: 1, xepLoaiHocTap: 'Giỏi' },
      { idXepLoaiHocTap: 2, xepLoaiHocTap: 'Khá' },
      { idXepLoaiHocTap: 3, xepLoaiHocTap: 'Trung bình' },
      { idXepLoaiHocTap: 4, xepLoaiHocTap: 'Yếu' },
      // ...add more sample data up to 20 entries
    ];
    
    // Sample data for 'XepLoaiHanhKiem' interface
    this.loaiHanhKiem = [
      { idXepLoaiHanhKiem: 1, xepLoaiHanhKiem: 'Tốt' },
      { idXepLoaiHanhKiem: 2, xepLoaiHanhKiem: 'Khá' },
      { idXepLoaiHanhKiem: 3, xepLoaiHanhKiem: 'Trung bình' },
      { idXepLoaiHanhKiem: 4, xepLoaiHanhKiem: 'Yếu' },
      // ...add more sample data up to 20 entries
    ];
  }
}

