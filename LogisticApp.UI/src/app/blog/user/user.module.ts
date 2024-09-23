import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PostSharedModule } from "../../shared/post.module";
import { UserRoutingModule } from "./user.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignInComponent } from "./sign-in/sign-in.component";
import { PasswordModule } from 'primeng/password';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { MessageService } from "primeng/api";
import { BlockSpinnerComponent } from "src/app/shared/block-spinner/block-spinner.component";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";
@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
  ]
})
export class UserModule { }
