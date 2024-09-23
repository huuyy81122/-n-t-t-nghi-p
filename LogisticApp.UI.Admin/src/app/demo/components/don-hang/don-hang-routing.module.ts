import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuanLyDonHangComponent } from './quan-ly-don-hang/quan-ly-don-hang.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'quan-ly-don-hang', component: QuanLyDonHangComponent}
    ])],
    exports: [RouterModule]
})
export class PrimeBlocksRoutingModule { }
