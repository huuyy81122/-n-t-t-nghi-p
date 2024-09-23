import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    exports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        FormsModule,
        CommonModule,
        NgxSpinnerModule,
    ],
    declarations: [
    ],
})
export class UtilityModule { }
