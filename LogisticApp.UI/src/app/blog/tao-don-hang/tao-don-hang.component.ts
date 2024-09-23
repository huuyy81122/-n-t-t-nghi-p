import { VnPayApiService } from './../../services/api/vnpay.service';
import { ChangeDetectorRef, Component, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from "src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { TokenService } from "src/app/utils/jwt";
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { DonHangApiService } from 'src/app/services/api/tao-don-hang.service';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
    private apiKey = 'oez7ESV06v0Veo4RLW4PKHkSPrWrTPk8jA4VUyP5';
    private apiUrl = `https://rsapi.goong.io/geocode?api_key=${this.apiKey}`;
  
    constructor(private http: HttpClient) {}
  
    getCoordinates(address: string) {
      return this.http.get(`${this.apiUrl}&address=${encodeURIComponent(address)}`);
    }
  }
  
@Component({
  selector: "tao-don-hang",
  templateUrl: "./tao-don-hang.component.html",
  styleUrls: ["./tao-don-hang.component.scss"]
})
export class TaoDonHangComponent implements OnInit {
  private map: any;
  private geocoderUrl = 'https://rsapi.goong.io/Geocode';
  private distanceMatrixUrl = 'https://rsapi.goong.io/DistanceMatrix';
  private apiKey = '0QTwm3kJYXEWKxVSZDIFlFwhppFu6Ba9Bgc6ixcS'; // Thay thế bằng API Key của bạn
  private mapTilesKey = 'tgTRVhjBEYtWLw6nPo1aNEqsUM0k2M16Q1Xijidz'; // Thay thế bằng Map Tiles Key của bạn

  distanceResult: string = ''; // Biến để lưu kết quả khoảng cách
  isFormVisible: boolean = true;
/////////////
  events: any[];
  danhSachs: any;
  dieuChinh: any;
  user: any;
  payInfo: any;
  hoTen: any;
  maDonHang: any;
  hinhThucVanChuyen: any;
  dichVu: any;
  idTransport: any; 
  idServicesType: any;
  idWeight: any;
  khoangCach: number = 0;
  selectedTransportType: any;
  selectedServiceType: any;
  selectedWeight: any;
  price: number = 0;
  weight: any;
  ghiChu: any;
  listTinh: any;
  listHuyen: any;
  listXa: any;
  idHuyen: any;
  idXa: any;
  idTinh: any;
  idTinhNhan: any;
  idXaNhan: any;
  idHuyenNhan: any;
  listHuyenFilter: any;
  listTinhFilter: any;
  listXaFilter: any;
  listHuyenNhanFilter: any;
  listTinhNhanFilter: any;
  listXaNhanFilter: any;
  huyen: any;
  xa: any;
  tinh: any;
  tinhNhan: any;
  xaNhan: any;
  huyenNhan: any;
  nguoiNhan: any;
  sdtNguoiNhan: any;
  longitude: any;
  latitude: any;
  constructor(
    private tuyenSinhThiSinhDangKyXetTuyenApiService: TuyenSinhThiSinhDangKyXetTuyenApiService,
    private blockService: BlockService,
    private tokenServices: TokenService,
    private cdf: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private dotTuyenSinhServices: DotTuyenSinhApiService,
    private vnPayApiService : VnPayApiService,
    private http : HttpClient,
    private donHangServices: DonHangApiService,
    private messageService: MessageService,
    private geocodingService: GeocodingService
    ) {
    this.events = [
      { status: 'Đăng ký xét tuyển', date: '15/10/2020 10:30', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', image: 'game-controller.jpg', content: 'Trong khoảng thời gian đăng ký xét tuyển thí sinh đăng nhập vào hệ thống và lựa chọn đợt xét tuyển mong muốn.' },
      { status: 'Chờ kết quả xét duyệt', date: '15/10/2020 14:00', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: 'Quá trình xét duyệt hồ sơ của bạn sẽ diễn ra trong 20 ngày làm việc vui lòng chú ý điện thoại, email để nhận được thông báo. Nếu không thấy phản hồi sau 20 ngày hãy liên hệ với chúng tôi để được giải quyết.' },
      { status: 'Điều chỉnh nguyện vọng', date: '15/10/2020 16:15', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: 'Sau khi có kết quả, thí sinh có thể thực hiện điều chỉnh nguyện vọng. Nếu bạn không thực hiện được điều chỉnh nguyện vọng hãy liên hệ với chúng tôi,' },
      { status: 'Nhập học', date: '16/10/2020 10:00', icon: 'pi pi-check', bgColor: '#fff', color: '#1f3080', content: 'Dành cho thí sinh trúng tuyển. Thực hiện nhập học theo quy định của Bộ Giáo dục và Đào tạo' }
    ];
   }
   
  ngOnInit() {
    this.initMap();
    this.initData();
    this.dieuChinh = 1;
    this.maDonHang = this.generateRandomCode(6);
    this.route.queryParamMap.subscribe(params => {
      this.idTransport = params.get('idTransport');
      this.idServicesType = params.get('servicesType');
    });
    //console.log(this.idTransport)
    this.getTransport(this.idTransport);
    this.getService(this.idServicesType);
    this.getWeight();
    this.getTinh();
    this.getHuyen();
    this.getXa();
  }
  initData(): void {
    var user = this.tokenServices.decodeToken();
    this.user = user;
    this.vnPayApiService.payInfo(user?.user_id[0]).subscribe({
      next: (res: any) => {
        console.log(res)
        this.payInfo = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
    console.log(this.user)
  }
  
  handleGetPrice(event: any) {
    if(this.selectedWeight !== null && this.selectedServiceType !== undefined && this.selectedTransportType !== null && this.selectedTransportType !== undefined && this.selectedServiceType !== null && this.selectedServiceType !== undefined)
    {
      this.idServicesType = this.selectedServiceType.serviceTypeId;
      this.idTransport = this.selectedTransportType.transportTypeId;
      this.idWeight = this.selectedWeight.weightTypeId;
      //console.log(this.idServicesType,this.idTransport,this.idWeight);
      this.donHangServices.getPrice(this.idServicesType,this.idTransport, this.idWeight).subscribe({
        next: (res: any) => {
          if(res.statusCode === "Success")
          {
            this.price = res.data.priceValue;
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
          
        },
        error: (err: any) => {
          console.log(err.message)
        }
      })
      this.cdf.detectChanges();
    }
  }
  async handleOrder() {
    await this.handleToaDo();
    var model = {
      customerId: parseInt(this.user.user_id, 10),
      transportTypeId: this.idTransport,
      serviceTypeId: this.idServicesType,
      weightTypeId: this.idWeight,
      orderStatusId: 0,
      shipperId: 0,
      managerId: 0,
      orderFromCommuneId: this.idXa,
      orderFromDistrictId: this.idHuyen,
      orderFromProvinceId: this.idTinh,
      orderToCommuneId: this.idXaNhan,
      orderToDistrictId: this.idHuyenNhan,
      orderToProvinceId: this.idTinhNhan,
      note: this.ghiChu,
      shippingCode: this.maDonHang,
      quangDuong: this.khoangCach / 100,
      donGia: this.price,
      recipientName: this.nguoiNhan,
      recipientPhone: this.sdtNguoiNhan,
      latitude: this.latitude,
      longitude: this.longitude
    }
    console.log(model);
    this.donHangServices.create(model).subscribe({
      next: (res: any) => {
        if(res.statusCode === "Success")
        {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Thêm đơn hàng thành công' });
          setTimeout(() => {
            this.router.navigateByUrl('lich-su-don-hang');
          }, 600); 
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  private initMap(): void {
    //lỗi
    (window as any).goongjs.accessToken = this.mapTilesKey;//
    this.map = new (window as any).goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json?api_key=' + this.mapTilesKey,
      center: [105.83991, 21.02800],
      zoom: 9
    });
  }
  handleKhoangCach(){
    //console.log(this.tinh, this.huyen, this.xa);
    //console.log(this.tinhNhan, this.huyenNhan, this.xaNhan); 
    this.calculateDistance(this.tinh+','+this.huyen+','+this.xa, this.tinhNhan+','+this.huyenNhan+','+this.xaNhan)
  }
  async handleToaDo(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.geocodingService.getCoordinates(this.tinh + ',' + this.huyen + ',' + this.xa)
        .subscribe(
          (data: any) => {
            if (data.results && data.results.length > 0) {
              this.latitude = data.results[0].geometry.location.lat;
              this.longitude = data.results[0].geometry.location.lng;
              this.cdf.detectChanges();
              resolve(); // Đảm bảo rằng Promise được giải quyết khi nhận được dữ liệu
            } else {
              reject('No results found'); // Hoặc có thể là một giá trị khác để xử lý lỗi
            }
          },
          (error) => {
            reject(error); // Xử lý lỗi từ Observable
          }
        );
    });
  }
  calculateDistance(origin: any, destination: any): void {
    const vehicle = 'car'; // Mặc định là 'car'

    if (!origin || !destination) {
      alert('Please enter both origin and destination addresses.');
      return;
    }

    const urlOrigin = `${this.geocoderUrl}?address=${encodeURIComponent(origin)}&api_key=${this.apiKey}`;
    const urlDestination = `${this.geocoderUrl}?address=${encodeURIComponent(destination)}&api_key=${this.apiKey}`;

    Promise.all([
      this.http.get(urlOrigin).toPromise(),
      this.http.get(urlDestination).toPromise()
    ]).then((results: any) => {
      const [originResult, destinationResult] = results;

      if (originResult.status === 'OK' && destinationResult.status === 'OK') {
        const originCoordinates = originResult.results[0].geometry.location;
        const destinationCoordinates = destinationResult.results[0].geometry.location;

        const url = `${this.distanceMatrixUrl}?origins=${originCoordinates.lat},${originCoordinates.lng}&destinations=${destinationCoordinates.lat},${destinationCoordinates.lng}&vehicle=${vehicle}&api_key=${this.apiKey}`;

        this.http.get(url).subscribe((distanceResult: any) => {
          this.khoangCach = distanceResult.rows[0].elements[0].distance.value;
          this.distanceResult = distanceResult.rows[0].elements[0].distance.text;
          
         // (document.getElementById('distance') as HTMLInputElement).value = this.distanceResult;
        });
      } else {
        alert('Unable to geocode addresses. Please try again.');
      }
    }).catch((error: any) => {
      console.error('Error:', error);
      alert('Error occurred. Please try again.');
    });
  }
  generateRandomCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getService(id: any){
    this.donHangServices.getServices().subscribe({
      next: (res: any) => {
        this.dichVu = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getWeight(){
    this.donHangServices.getWeight().subscribe({
      next: (res: any) => {
        this.weight = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getTransport(id: any){
    this.donHangServices.getTransport().subscribe({
      next: (res: any) => {
        this.hinhThucVanChuyen = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getTinh(){
    this.donHangServices.getTinh().subscribe({
      next: (res: any) => {
        this.listTinh = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getHuyen(){
    this.donHangServices.getHuyen().subscribe({
      next: (res: any) => {
        this.listHuyen = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getXa(){
    this.donHangServices.getXa().subscribe({
      next: (res: any) => {
        this.listXa = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  handleChangeDiaChi(event: any, type: any) {
    if(type === 'TINH')
    {
      this.idTinh = event.value.provinceId;
      this.tinh = event.value.provinceName;
      this.listHuyenFilter = this.listHuyen.filter((x: any) => x.provinceId === this.idTinh);
      this.cdf.detectChanges();
    }
    else if(type === 'TINHNHAN'){
      this.idTinhNhan = event.value.provinceId;
      this.tinhNhan = event.value.provinceName;
      this.listHuyenNhanFilter = this.listHuyen.filter((x: any) => x.provinceId === this.idTinhNhan);
      this.cdf.detectChanges();
    }
    else if(type === 'HUYEN'){
      this.idHuyen = event.value.districtId;
      this.huyen = event.value.districtName;
      this.listXaFilter = this.listXa.filter((x: any) => x.districtId === this.idHuyen);
      this.cdf.detectChanges();
    }
    else if(type === 'HUYENNHAN'){
      this.idHuyenNhan = event.value.districtId;
      this.huyenNhan = event.value.districtName;
      this.listXaNhanFilter = this.listXa.filter((x: any) => x.districtId === this.idHuyenNhan);
      this.cdf.detectChanges();
    }
    else if(type === 'XA'){
      this.idXa = event.value.communeId;
      this.xa =  event.value.communeName;
      this.cdf.detectChanges();
    }
    else if(type === 'XANHAN'){
      this.idXaNhan = event.value.communeId;
      this.xaNhan =  event.value.communeName;
      this.cdf.detectChanges();
    }
  }
}

