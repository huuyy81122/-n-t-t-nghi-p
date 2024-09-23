import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { flyIn } from "../../shared/animations/fly-in";
import * as moment from 'moment';
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { QueryFilerModel } from "src/app/models";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NganhApiService } from "src/app/services/api/nganh.service";

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    flyIn
  ]
})
export class HomeComponent implements OnInit {
  dotTuyenSinhFilter : QueryFilerModel;
  dotTuyenSinhData: any;
  isLoggedIn: boolean;
  events: EventItem[];
  products: any;
  responsiveOptions: any[] | undefined;
  nganhs: any[];
  listHinhThucVanChuyen: any[] = [{
    name: 'Vận chuyển nội thành Hà Nội',
    idServicesType: 1,
    idTransport: 1,
    time: '3 ngày',
    timeHoaToc: '1 ngày'
  },
  {
    name: 'Vận chuyển ngoại thành Hà Nội',
    idServicesType: 0,
    idTransport: 0,
    time: '4 ngày',
    timeHoaToc: '1 ngày'
  },
  {
    name: 'Vận chuyển các tỉnh thành',
    idServicesType: 0,
    idTransport: 0,
    time: '5 Ngày',
    timeHoaToc: 'Không hỗ trợ'
  }];
  galleriaResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  carouselResponsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  constructor(
    private dotTuyenSinhServices: DotTuyenSinhApiService,
    private cdf: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private nganhApiService: NganhApiService
    ) {
      this.nganhs = [];
      this.events = [
        { status: 'Đăng ký xét tuyển', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Tiếp nhận hồ sơ', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Tra cứu kết quả', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Nhập học', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  ngOnInit() {
    //window.location.reload();
    this.initData();
    this.getDotTuyenSinh();
		this.authService.login$.subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn;
		  });
  }
  formatDate(dateString: string): string {
    const formattedDate = moment(dateString).format('DD-MM-YYYY');
    return formattedDate;
  }
  getDotTuyenSinh(): Promise<any> {
    this.dotTuyenSinhFilter = {pageNumber: 1, pageSize: 1000, showAdSearch: false, textSearch: null}
    this.dotTuyenSinhServices.getFilter(this.dotTuyenSinhFilter).subscribe({
      next: (res: any) => {
        this.dotTuyenSinhData = res.data;
        console.log(res.data)
        this.cdf.detectChanges();
        return res.data;
      },
      error: (err: any) => {
    
      }
    })
    return;
  }
  handleNavigate(route: any){
		if(!this.isLoggedIn){
			this.router.navigateByUrl("login");
		}
		else{
			this.router.navigateByUrl(route);
		}
	}
  getUrl(idTransport: any, servicesType: any){
    var url =  'tao-don-hang?idTransport=' + idTransport + '&&servicesType=' + servicesType
    this.router.navigateByUrl(url);
  }
  initData(): void {
    this.products= [{
			id: '1000',
			code: 'f230fh0g3',
			name: 'Ninja Van',
			description: 'Product Description',
			image: '../assets/imgs/banner-8.png',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1000',
			code: 'f230fh0g3',
			name: 'Viettel Post',
			description: 'Product Description',
			image: '../assets/imgs/banner-2.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}, {
			id: '1000',
			code: 'f230fh0g3',
			name: 'VietNam Post',
			description: 'Product Description',
			image: '../assets/imgs/banner-1.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		},
    {
			id: '1000',
			code: 'f230fh0g3',
			name: 'VietNam Post',
			description: 'Product Description',
			image: '../assets/imgs/bn34.jpg',
			price: 65,
			category: 'Accessories',
			quantity: 24,
			inventoryStatus: 'INSTOCK',
			rating: 5
		}]
    this.nganhApiService.getDanhSachNganh().subscribe({
      next: (res: any) => {
        this.nganhs = res;
        console.log(res)
        this.cdf.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
