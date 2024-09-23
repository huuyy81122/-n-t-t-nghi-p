import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './blog/user/sign-in/sign-in.component';
import { SignUpComponent } from './blog/user/sign-up/sign-up.component';
import { LichSuDangKyComponent } from './blog/lich-su-dang-ky/lich-su-dang-ky.component';
import { TraCuuComponent } from './blog/tra-cuu/tra-cuu.component';
import { ThanhToanComponent } from './blog/thanh-toan/thanh-toan.component';
import { KetQuaThanhToanComponent } from './blog/page/ket-qua-thanh-toan/ket-qua-thanh-toan.component';
import { AuthGuard } from './shared/auth-guard';
import { TaoDonHangComponent } from './blog/tao-don-hang/tao-don-hang.component';
import { ManagerOrderComponent } from './blog/manager-order/manager-order.component';
import { ShipperOrderComponent } from './blog/shipper-order/shipper-order.component';
import { BangGiaComponent } from './blog/bang-gia/bang-gia.component';
import { ShipperGuard } from './shared/shipper-guard';
import { DonHangShipperComponent } from './blog/don-hang-shipper/don-hang-shipper.component';
import { DanhGiaForShipperComponent } from './blog/danh-gia-for-shipper/danh-gia-shipper.component';
import { QuanLyDonHangShipperComponent } from './blog/quan-ly-don-hang/quan-ly-don-hang-shipper.component';
import { QuanLyGuard } from './shared/quan-ly-guard';
import { TinhTrangGiaoHangComponent } from './blog/tinh-trang-giao-hang/tinh-trang-giao-hang.component';
import { QuanLyNguoiVanChuyenComponent } from './blog/quan-ly-nguoi-van-chuyen/quan-ly-nguoi-van-chuyen.component';
// import { SignInComponent } from './blog/user/sign-in/sign-in.component';
// import { RetrievePwdComponent } from './blog/user/retrieve-pwd/retrieve-pwd.component';
// import { SignUpComponent } from './blog/user/sign-up/sign-up.component';

const routes: Routes =[
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full"
	},
	{
		path: "home",
		loadChildren: () => import("./blog/home/home.module").then(m => m.HomeModule)
	},
	{
		path: "posts",
		canActivate: [AuthGuard],
		loadChildren: () => import("./blog/home/home.module").then(m => m.HomeModule)
	},
	{
		path: "login",
		component: SignInComponent
	},
	{
		path: "ket-qua-thanh-toan",
		canActivate: [AuthGuard],
		component: KetQuaThanhToanComponent
	},
	{
		path: "register",
		component: SignUpComponent
	},
	{
		path: "lich-su-don-hang",
		canActivate: [AuthGuard],
		component: LichSuDangKyComponent
	},
	{
		path: "tra-cuu",
		component: TraCuuComponent
	},
	{
		path: "thanh-toan",
		canActivate: [AuthGuard],
		component: ThanhToanComponent
	},
	{
		path: "tao-don-hang",
		canActivate: [AuthGuard],
		component: TaoDonHangComponent
	},
	{
		path : "manager-order",
		canActivate : [AuthGuard],
		component : ManagerOrderComponent
	},
	{
		path : "shipper-order",
		canActivate : [AuthGuard],
		component : ShipperOrderComponent
	},
	{
		path : "bang-gia",
		canActivate : [AuthGuard],
		component : BangGiaComponent
	},
	{
		path : "don-hang-shipper",
		canActivate : [ShipperGuard],
		component : DonHangShipperComponent
	},
	{
		path : "danh-gia-for-shipper",
		canActivate : [ShipperGuard],
		component : DanhGiaForShipperComponent
	},
	{
		path: "quan-ly-don-hang",
		canActivate : [QuanLyGuard],
		component: QuanLyDonHangShipperComponent
	},
	{
		path: "tinh-trang-giao-hang",
		canActivate : [ShipperGuard],
		component: TinhTrangGiaoHangComponent
	},
	{
		path: "quan-ly-nguoi-van-chuyen",
		canActivate : [QuanLyGuard],
		component: QuanLyNguoiVanChuyenComponent
	},
	{
		path: "**",
		loadChildren: () => import("./blog/home/home.module").then(m => m.HomeModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
