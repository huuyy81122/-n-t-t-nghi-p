import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PrimeBlocksRoutingModule } from './don-hang-routing.module';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { QuanLyDonHangComponent } from './quan-ly-don-hang/quan-ly-don-hang.component';
import { SharedModule } from 'src/shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        ChipModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        PasswordModule,
        TooltipModule,
        PrimeBlocksRoutingModule,
        DropdownModule,
        SharedModule
    ],
    declarations: [QuanLyDonHangComponent],
    providers: [MessageService, ConfirmationService, DatePipe ]
})
export class PrimeBlocksModule { }
