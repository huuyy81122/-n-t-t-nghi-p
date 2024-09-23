import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from './services/auth.service';
// import { SignInService } from "./blog/user/sign-in/sign-in.service";
// import { SignUpService } from "./blog/user/sign-up/sign-up.service";
import { merge } from "rxjs"
import { MenuItem } from "primeng/api";
import { TokenService } from "./utils/jwt";
// import { MessageService } from "primeng/api";

@Component({
	selector: "root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	public showToggleMenu = false;
	public currentUser: any;
	private globalClickCallbackFn: Function;
	isLoggedIn: boolean;
	items: MenuItem[] | undefined;
	item1s: MenuItem[] | undefined;
	item2s: MenuItem[] | undefined;
	item3s: MenuItem[] | undefined;
	products: any[];
	user: any;
	user_type: any;
	tenDangNhap: any;
	constructor(
		private authService: AuthService,
		private tokenServices: TokenService,
		public elementRef: ElementRef,
		public renderer: Renderer2,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public translate: TranslateService,
		private cdf: ChangeDetectorRef,
		// public signInService: SignInService,
		// public signUpService: SignUpService,
		// private messageService: MessageService
	) { }

	ngOnInit() {
		this.user = this.tokenServices.decodeToken();
		this.activatedRoute.queryParamMap.subscribe(params => {
			if(params.get('currentUser') != null || params.get('currentUser') != undefined){
				var currentUser = params.get('currentUser').split("_user_type_");
				this.tenDangNhap = currentUser[0];
				this.user_type = currentUser[1];
			}
			else{
				this.user = this.tokenServices.decodeToken();
				this.tenDangNhap = this.user != null && this.user != undefined ? this.user.email : '';
				this.user_type = this.user.user_type;
			}
		  });
		this.cdf.detectChanges();
		this.items = [
            {
                label: 'Tạo đơn hàng',
				routerLink: "posts"
                // icon: 'pi pi-fw pi-file',
            },
            {
                label: 'Lịch sử đơn hàng',
				routerLink: "lich-su-don-hang"
                // icon: 'pi pi-fw pi-pencil',
            },
            {
                label: 'Tra cứu đơn hàng',
				routerLink: "tra-cuu"
                // icon: 'pi pi-fw pi-search',
            },
            // {
            //     label: 'Thanh toán đơn hàng',
			// 	routerLink: "thanh-toan"
            //     // icon: 'pi pi-fw pi-calendar',
            // },
			{
                label: 'Bảng giá dịch vụ',
				routerLink: "bang-gia"
                // icon: 'pi pi-fw pi-search',
            }
            // {
            //     label: 'Quit',
            //     icon: 'pi pi-fw pi-power-off'
            // }
        ];
		this.item1s = [
            {
                label: 'Thông tin hồ sơ',
				
                // icon: 'pi pi-fw pi-file',
            },
            {
                label: 'Đăng xuất',
				command: () => {
					this.doLogout();
				}
                // icon: 'pi pi-fw pi-pencil',
            }
        ];
		this.item2s = [
            {
                label: 'Đơn hàng của bạn',
				routerLink: "don-hang-shipper"
                // icon: 'pi pi-fw pi-file',
            },
            {
                label: 'Đánh giá của bạn',
				routerLink: "danh-gia-for-shipper"
                // icon: 'pi pi-fw pi-pencil',
            },
			{
                label: 'Tình trạng giao hàng',
				routerLink: "tinh-trang-giao-hang"
                // icon: 'pi pi-fw pi-pencil',
            }
        ];
		this.item3s = [
            {
                label: 'Quản lý đơn hàng',
				routerLink: "quan-ly-don-hang"
                // icon: 'pi pi-fw pi-file',
            },
            {
                label: 'Quản lý người vận chuyển',
				routerLink: "quan-ly-nguoi-van-chuyen"
                // icon: 'pi pi-fw pi-pencil',
            }
        ];
		
		this.globalClickCallbackFn = this.renderer.listen(this.elementRef.nativeElement, "click", (event: any) => {
			console.log("全局监听点击事件>" + event);
		});

		this.currentUser = JSON.parse(localStorage.getItem("LOGIN"));
		this.authService.login$.subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn;
		  });
		// merge(this.signInService.currentUser, this.signUpService.currentUser)
		// 	.subscribe(
		// 		data => {
		// 			this.currentUser = data;
		// 			let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
		// 			let routerState: RouterState = this.router.routerState;
		// 			let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

		// 			console.log(activatedRouteSnapshot);
		// 			console.log(routerState);
		// 			console.log(routerStateSnapshot);

		// 			// 如果是从/login这个URL进行的登录，跳转到首页，否则什么都不做
		// 			if (routerStateSnapshot.url.indexOf("/login") != -1) {
		// 				this.router.navigateByUrl("/home");
		// 			}
		// 		},
		// 		error => console.error(error)
		// 	);

		// ngx-translate国际化服务相关的配置
		this.translate.addLangs(["zh", "en"]);
		this.translate.setDefaultLang("zh");
		const browserLang = this.translate.getBrowserLang();
		console.log("获取到浏览器的语言>" + browserLang);
		this.translate.use(browserLang.match(/zh|en/) ? browserLang : "zh");
	}

	ngOnDestroy() {
		if (this.globalClickCallbackFn) {
			this.globalClickCallbackFn();
		}
	}

	onMenuToggle() {
		this.showToggleMenu = !this.showToggleMenu;
	}

	doLogout() {
		console.log
		this.authService.setLoginStatus(false);
		window.localStorage.removeItem("currentUser");
		window.localStorage.removeItem("user_type");
		this.user_type = null;
		this.cdf.detectChanges();
		this.router.navigateByUrl("login");
	}
	handleNavigate(route: any){
		if(!this.isLoggedIn){
			this.router.navigateByUrl("login");
		}
		else{
			this.router.navigateByUrl(route);
		}
	}
}
