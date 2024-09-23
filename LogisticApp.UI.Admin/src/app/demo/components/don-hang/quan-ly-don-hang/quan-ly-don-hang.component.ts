import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DonHangApiService  } from 'src/app/demo/service/tao-don-hang.service';

@Component({
    templateUrl: './quan-ly-don-hang.component.html',
    styleUrls: ['./quan-ly-don-hang.scss']
})
export class QuanLyDonHangComponent implements OnInit {
    customers!: any[];

    representatives!: any[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];
    data: any;
    
    constructor(
        private donHangApiService: DonHangApiService,
        private cdf: ChangeDetectorRef, 
        private fb: FormBuilder,
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe
    ) {
           
        }

    ngOnInit() {
        this.initData()
    }
    initData(): void {
        this.donHangApiService.getAll().subscribe({
                next: (res: any) => {
                    console.log(res)
                    this.data = res.listData;
                    this.cdf.detectChanges();
                },
                error: (err: any) => {
                    console.log(err)
                }
        });
    }
    clear(table: Table) {
        table.clear();
    }
    
}
