import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { QuanLyNguoiDungComponent } from './demo/components/quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { KhoiLuongVanChuyenComponent } from './demo/components/danh-muc/khoi-luong-van-chuyen/khoi-luong-van-chuyen.component';
import { HinhThucVanChuyenComponent } from './demo/components/danh-muc/hinh-thuc-van-chuyen/hinh-thuc-van-chuyen.component';
import { DichVuVanChuyenComponent } from './demo/components/danh-muc/dich-vu-van-chuyen/dich-vu-van-chuyen.component';
import { GiaVanChuyenComponent } from './demo/components/danh-muc/gia-van-chuyen/gia-van-chuyen.component';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, QuanLyNguoiDungComponent, KhoiLuongVanChuyenComponent, GiaVanChuyenComponent,HinhThucVanChuyenComponent, DichVuVanChuyenComponent],
    imports: [
        AppRoutingModule, AppLayoutModule, CommonModule,
        ButtonModule,
        RippleModule,
        ChipModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        TooltipModule,
        DropdownModule,
        SharedModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService, ConfirmationService, DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
