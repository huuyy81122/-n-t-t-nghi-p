import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { QuanLyNguoiDungComponent } from './demo/components/quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { DichVuVanChuyenComponent } from './demo/components/danh-muc/dich-vu-van-chuyen/dich-vu-van-chuyen.component';
import { HinhThucVanChuyenComponent } from './demo/components/danh-muc/hinh-thuc-van-chuyen/hinh-thuc-van-chuyen.component';
import { KhoiLuongVanChuyenComponent } from './demo/components/danh-muc/khoi-luong-van-chuyen/khoi-luong-van-chuyen.component';
import { GiaVanChuyenComponent } from './demo/components/danh-muc/gia-van-chuyen/gia-van-chuyen.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'danh-muc/dich-vu-van-chuyen', component: DichVuVanChuyenComponent},
                    { path: 'danh-muc/hinh-thuc-van-chuyen', component: HinhThucVanChuyenComponent},
                    { path: 'danh-muc/khoi-luong-van-chuyen', component: KhoiLuongVanChuyenComponent},
                    { path: 'danh-muc/gia-van-chuyen', component: GiaVanChuyenComponent},
                    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'quan-ly', loadChildren: () => import('./demo/components/don-hang/don-hang.module').then(m => m.PrimeBlocksModule) },
                    { path: 'quan-ly-nguoi-dung', component: QuanLyNguoiDungComponent },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
