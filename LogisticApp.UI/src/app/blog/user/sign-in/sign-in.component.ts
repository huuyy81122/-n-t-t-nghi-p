import { BlockService } from 'src/app/shared/block-spinner/block-service.service';
import { AuthenticationApiService } from './../../../services/api/authentication.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { fadeIn } from "../../../shared/animations/fade-in";
import { FormGroup } from "@angular/forms";
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import { jwtDecode } from 'jwt-decode';

interface UserInfo {
  user_type: any,
  email: any
}

@Component({
  selector: "sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  animations: [fadeIn]
})
export class SignInComponent implements OnInit {
  public error: Error;
  public signInInfo: any = {
    userName: "",
    password: "",
    captcha: "",
    rememberMe: true
  };
  form: FormGroup
  constructor(
    public router: Router,
    private AuthenticationApiService: AuthenticationApiService,
    private authService: AuthService,
    private messageService: MessageService,
    private blockService: BlockService
  ) { }

  ngOnInit() {
    //window.location.reload();
  }

  public doSignIn(): void {
    this.blockService.block()
    console.log(this.signInInfo);
    this.AuthenticationApiService.login({email: this.signInInfo.userName, password: this.signInInfo.password}).subscribe({
      next: async(res: any) => {
        if(res.statusCode === 'Success')
          {
            this.blockService.unblock();
            this.authService.setLoginStatus(true);
            const token = res.token;
            const user = jwtDecode(token) as UserInfo;
            window.localStorage.setItem("currentUser", JSON.stringify(token));
            window.localStorage.setItem("user_type", user.user_type);
              this.messageService.add({severity:'success', summary:'Đăng nhập thành công', detail:'', life: 3000});
              setTimeout(() => {
                this.router.navigate(['home'], { queryParams: { currentUser: user.email+"_user_type_"+user.user_type } });
              }, 400);     
          }
          else{
            this.blockService.unblock();
            this.messageService.add({severity:'error', summary:'Lỗi đăng nhập', detail: res.message, life: 3000});
          }
      },
      error: (err: any) => {
        this.blockService.unblock();
        console.log(err);
        this.messageService.add({severity:'error', summary:'Lỗi đăng nhập', detail: 'Hãy thử đăng nhập lại sau', life: 3000});
      }
    })
  }
  public retrievePwd(): void {
    this.router.navigateByUrl("retrievepwd");
  }
}
