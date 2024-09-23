import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { KetQuaThanhToanComponent } from './ket-qua-thanh-toan/ket-qua-thanh-toan.component';

@NgModule({
    declarations: [KetQuaThanhToanComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
    ]
})
export class PagesModule { }
