import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Trang chủ',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Danh mục',
                items: [
                    { label: 'Hình thức vận chuyển', icon: 'pi pi-fw pi-id-card', routerLink: ['/danh-muc/hinh-thuc-van-chuyen'] },
                    //{ label: 'Ngành', icon: 'pi pi-fw pi-check-square', routerLink: ['/danh-muc/nganh'] },
                    //{ label: 'Môn xét tuyển', icon: 'pi pi-fw pi-bookmark', routerLink: ['/danh-muc/mon-xet-tuyen'] },
                    // { label: 'Đối tượng ưu tiên', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/danh-muc/doi-tuong-uu-tien'] },
                    { label: 'Dịch vụ vận chuyển', icon: 'pi pi-fw pi-box', routerLink: ['/danh-muc/dich-vu-van-chuyen'] },
                    // { label: 'Trường THPT', icon: 'pi pi-fw pi-table', routerLink: ['/danh-muc/truong-thpt'] },
                    // { label: 'Khu vực ưu tiên', icon: 'pi pi-fw pi-list', routerLink: ['/danh-muc/khu-vuc-uu-tien'] },
                    // { label: 'Giấy tờ', icon: 'pi pi-fw pi-share-alt', routerLink: ['/danh-muc/giay-to'] },
                    { label: 'Khối lượng vận chuyển', icon: 'pi pi-fw pi-tablet', routerLink: ['/danh-muc/khoi-luong-van-chuyen'] },
                    { label: 'Giá vận chuyển', icon: 'pi pi-fw pi-clone', routerLink: ['/danh-muc/gia-van-chuyen'] },
                    // { label: 'Xếp loại hạnh kiểm THPT', icon: 'pi pi-fw pi-image', routerLink: ['/danh-muc/xep-loai-hanh-kiem'] },
                    //{ label: 'Tổ hợp ngành xét tuyển', icon: 'pi pi-fw pi-bars', routerLink: ['/danh-muc/to-hop-nganh']}
                ]
            },
            {
                label: 'Quản lý',
                items: [
                    { label: 'Quản lý đơn hàng', icon: 'pi pi-fw pi-eye', routerLink: ['/quan-ly/quan-ly-don-hang']},
                    //{ label: 'Quản lý đợt xét tuyển', icon: 'pi pi-fw pi-globe', routerLink: ['/ke-hoach-tuyen-sinh/quan-ly-dot-tuyen-sinh']},
                    //{ label: 'Quản lý hồ sơ', icon: 'pi pi-fw pi-comment', routerLink: ['/ke-hoach-tuyen-sinh/quan-ly-ho-so'] },
                    //{ label: 'Quản lý học phí', icon: 'pi pi-fw pi-file', routerLink: ['/ke-hoach-tuyen-sinh/quan-ly-hoc-phi'] },
                    //{ label: 'Quản lý trúng tuyển', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/ke-hoach-tuyen-sinh/quan-ly-trung-tuyen'] },
                ]
            },
            {
                label: 'Người dùng',
                items: [
                    { label: 'Quản lý người dùng', icon: 'pi pi-fw pi-user', routerLink: ['/quan-ly-nguoi-dung'] },
                    // { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    // { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}
