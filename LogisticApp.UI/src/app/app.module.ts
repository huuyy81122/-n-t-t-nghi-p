import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService, TranslateStore } from "@ngx-translate/core";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from "primeng/api";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
// import { SignInService } from "./blog/user/sign-in/sign-in.service";

import { AppRoutingModule } from './app.routing.module';
import { ConfirmationService } from "primeng/api";
import { AuthGuard } from "./shared/auth-guard";
import { BlockService } from "./shared/block-spinner/block-service.service";
import { NiceFishHttpInterceptor } from "./shared/NiceFishHttpInterceptor";
import { UserModule } from "./blog/user/user.module";
import { LichSuDangKyComponent } from "./blog/lich-su-dang-ky/lich-su-dang-ky.component";
import { TraCuuComponent } from "./blog/tra-cuu/tra-cuu.component";
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";
import { GalleriaModule } from "primeng/galleria";
import { ThanhToanComponent } from "./blog/thanh-toan/thanh-toan.component";
import { KetQuaThanhToanComponent } from "./blog/page/ket-qua-thanh-toan/ket-qua-thanh-toan.component";
import { TaoDonHangComponent } from "./blog/tao-don-hang/tao-don-hang.component";
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ShipperOrderComponent } from "./blog/shipper-order/shipper-order.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { BangGiaComponent } from "./blog/bang-gia/bang-gia.component";
import { DonHangShipperComponent } from "./blog/don-hang-shipper/don-hang-shipper.component";
import { ShipperGuard } from "./shared/shipper-guard";
import { ManagerOrderComponent } from "./blog/manager-order/manager-order.component";
import { DanhGiaForShipperComponent } from "./blog/danh-gia-for-shipper/danh-gia-shipper.component";
import { ChartModule } from 'primeng/chart';
import { QuanLyDonHangShipperComponent } from "./blog/quan-ly-don-hang/quan-ly-don-hang-shipper.component";
import { QuanLyGuard } from "./shared/quan-ly-guard";
import { TinhTrangGiaoHangComponent } from "./blog/tinh-trang-giao-hang/tinh-trang-giao-hang.component";
import { QuanLyNguoiVanChuyenComponent } from "./blog/quan-ly-nguoi-van-chuyen/quan-ly-nguoi-van-chuyen.component";
import { RoundPipe } from "./utils/pipe/round.pipe";
/**
 * Angular Ivy 要求导出一个模块
 * @see https://github.com/ngx-translate/core
 * @param http 
 * @returns 
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LichSuDangKyComponent,
    TraCuuComponent,
    ThanhToanComponent,
    KetQuaThanhToanComponent,
    TaoDonHangComponent,
    TinhTrangGiaoHangComponent,
    QuanLyNguoiVanChuyenComponent,
    RoundPipe,
    ShipperOrderComponent,
    BangGiaComponent,
    DonHangShipperComponent,
    ManagerOrderComponent,
    DanhGiaForShipperComponent,
    QuanLyDonHangShipperComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
		ImageModule,
		GalleriaModule,
		CarouselModule,
    BrowserAnimationsModule,
    RouterModule,
    UserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule,
    ChartModule
  ],
  providers: [
    TranslateService,
    TranslateStore,
    // SignInService,
    MessageService,
    ConfirmationService,
    BlockService,
    { provide: HTTP_INTERCEPTORS, useClass: NiceFishHttpInterceptor, multi: true },
    AuthGuard,
    ShipperGuard,
    QuanLyGuard,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
