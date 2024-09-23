import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KetQuaThanhToanComponent } from './ket-qua-thanh-toan/ket-qua-thanh-toan.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'ket-qua-thanh-toan', component: KetQuaThanhToanComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
