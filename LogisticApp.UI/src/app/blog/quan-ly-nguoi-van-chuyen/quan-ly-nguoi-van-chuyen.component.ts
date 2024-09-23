import { UserApiService } from 'src/app/services/api/users.service';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmPopup } from "primeng/confirmpopup";
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { LichSuDonHangApiService } from "src/app/services/api/lich-su-don-hang.service";
import { DonHangApiService } from "src/app/services/api/tao-don-hang.service";
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from "src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service";
import { VnPayApiService } from "src/app/services/api/vnpay.service";
import { VoteApiService } from "src/app/services/api/vote.service";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { TokenService } from "src/app/utils/jwt";

@Component({
  selector: "quan-ly-nguoi-van-chuyen",
  templateUrl: "./quan-ly-nguoi-van-chuyen.component.html",
  styleUrls: ["./quan-ly-nguoi-van-chuyen.component.scss"]
})
export class QuanLyNguoiVanChuyenComponent implements OnInit {
  events: any[];
  danhSachs: any;
  dieuChinh: any;
  sum: any;
  trungBinhDiem: any;
  data: any;

  options: any;
  constructor(
    private tokenServices: TokenService,
    private cdf: ChangeDetectorRef,
    private voteApiServices: VoteApiService,
    private messageService: MessageService,
    private vnPayApiService: VnPayApiService,
    private confirmationService: ConfirmationService,
    private donHangApiServices: DonHangApiService,
    private userApiService: UserApiService,
    ) {
    this.events = [
      { status: 'Chờ xác nhận', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', image: 'game-controller.jpg', content: '' },
      { status: 'Giao đơn vị giao hàng', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: '' },
      { status: 'Đang vận chuyện', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: '' },
      { status: 'Đã giao thành công', date: '', icon: 'pi pi-check', bgColor: '#fff', color: '#1f3080', content: '' }
    ];
   }
   @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  ngOnInit() {
    this.initData();
    this.dieuChinh = 1;

  }
  initData(): void {
    var user = this.tokenServices.decodeToken();
    this.userApiService.getShipper().subscribe({
      next: (res: any) => {
        this.danhSachs = res.listData;
        this.cdf.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    this.donHangApiServices.thongKe().subscribe({
      next: (res: any) => {
          const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const uniqueColors = this.generateUniqueColors(res.listData.length); 
        var dataSet = res?.listData.map((x: any, index: any) => {
          return {
              type: 'bar',
              label: x.maNhanVien,
              backgroundColor: uniqueColors[index],
              data: x.tyLeGiaoHang
        }})
        this.data = {
            labels: ['Đơn giao thành công', 'Đơn giao đang vận chuyển', 'Đơn giao thất bại'],
            datasets: dataSet
            
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
          this.cdf.detectChanges();
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      }
    })
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateUniqueColors(count) {
    const colors = new Set();
    while (colors.size < count) {
        colors.add(this.getRandomColor());
    }
    return Array.from(colors);
  }

capNhatTrangThai(event: any, orderId: any,statusId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: statusId === 6 ? 'Bạn có chắc muốn cập nhật giao hàng thất bại?' : 'Bạn có chắc muốn cập nhật giao hàng thành công?',
        accept: () => {
            this.donHangApiServices.capNhatTrangThai({orderId: orderId,statusCode: statusId}).subscribe({
              next:(res: any) => {
                if(res.statusCode === 'Success'){
                  this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000 });
                  this.initData();
                }
                else{
                  this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: res.message });
                }
              },
              error:(err: any) => {
                console.log(err)
              }
            })
           
        },
        reject: () => {
            //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
  }
  getStars(rate: number): number[] {
    return Array(Math.floor(rate)).fill(0);
  }
}
