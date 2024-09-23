import { UserApiService } from './../../../services/api/users.service';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { fadeIn } from "../../../shared/animations/fade-in";
import { environment } from "../../../../environments/environment";
import { BlockService } from 'src/app/shared/block-spinner/block-service.service';
import { UploadFileApiService } from 'src/app/services/api/upload-file.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: "sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  animations: [fadeIn]
})
export class SignUpComponent implements OnInit {
  @Input() panelTitle = "Đăng ký";
  @Input() btnLabel = "Đăng ký";
  @Input() isEdit = false;
  @Output() saveSuccess = new EventEmitter();

  // public isMock = environment.isMock;
  public userForm: FormGroup;
  public userInfo: any = {};
  visible: boolean = false;
  uploadedFiles: any[] = [];
  isSuccessFont: boolean = false;
  isSuccessBack: boolean = false;
  isSuccess: boolean = false;
  tinhs = [
    { idTinh: '01', tenTinh: 'Hà Nội' },
    { idTinh: '02', tenTinh: 'TP Hồ Chí Minh' },
    { idTinh: '03', tenTinh: 'Đà Nẵng' },
    { idTinh: '04', tenTinh: 'Hải Phòng' },
    { idTinh: '19', tenTinh: 'Cần Thơ' },
    { idTinh: '20', tenTinh: 'Bạc Liêu' }
    // ...add more sample data up to 20 entries
  ];
  public formErrors = {
    "email": "",
    "password": "",
    "confirmPassword": "",
    "formError": "",
    "captcha": "",
    "hoVaTen": "",
    "sdt": "",
    "cccd": "",
    "noiCap": "",
    "ngayCap": ""
  };
  validationMessages = {
    "email": {
      "required": "Email không được bỏ trống",
      "pattern": "Email không hợp lệ"
    },
    "sdt": {
      "required": "Số điện thoại không được bỏ trống",
      "minlength": "Số điện thoại không hợp lệ"
    },
    "cccd": {
      "required": "CMND/CCCD không được bỏ khống",
      "minlength": "CMND/CCCD không hợp lệ"
    },
    "hoVaTen": {
      "required": "Họ và tên không được để trống"
    },
    "password": {
      "required": "Mật khẩu không được để trống",
      "minlength": "Độ dài mật khẩu phải đủ 8 kí tự"
    },
    "confirmPassword": {
      "required": "Mật khẩu không được để trống",
      "minlength": "Độ dài mật khẩu phải đủ 8 kí tự",
      "validateEqual": "Mật khẩu không khớp"
    },
    "ngayCap": {
      "required": "Ngày cấp không được để trống"
    },
    "noiCap": {
      "required": "Nơi cấp không được để trống"
    },
  };

  constructor(public fb: FormBuilder,
    private blockService: BlockService,
    // public signUpService: SignUpService,
    private UserApiService: UserApiService,
    public route: ActivatedRoute,
    public router: Router,
    private messageService: MessageService,
    private uploadFileApiService: UploadFileApiService
    ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      "email": [
        this.userInfo.email,
        [
          Validators.required,
          Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
        ]
      ],
      "hoVaTen": [
        this.userInfo.hoVaTen,
        [
          Validators.required
        ]
      ],
      "sdt": [
        this.userInfo.sdt,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)

        ]
      ],
      "password": [
        this.userInfo.password,
        [
          Validators.required,
          Validators.minLength(8),
        ]
      ],
      "confirmPassword": [
        this.userInfo.confirmPassword,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + " ";
        }
      }
    }
  }

  doSignUp() {
    this.visible = false;
    if (this.userForm.valid) {
      // console.log(this.userForm.value);
      this.userInfo = this.userForm.value;
      const nameParts = this.userForm.value.hoVaTen.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      console.log(firstName, lastName)
      this.blockService.block();
      this.UserApiService.create({...this.userInfo, firstName, lastName}).subscribe({
        next: (res: any) => {
          if(res.statusCode === 'Success')
          {
            this.blockService.unblock();
            this.messageService.add({severity:'success', summary:'Đăng ký thành công', detail:'Hãy tiến hành đăng nhập', life: 3000});
            setTimeout(() => {
              this.router.navigateByUrl('login');
            }, 1000);        
          }
          else{
            this.blockService.unblock();
            this.messageService.add({severity:'error', summary:'Lỗi đăng ký', detail: res.message, life: 3000});
          }
        },
        error: (err: any) => {
          this.blockService.unblock();
          console.log(err)
          this.messageService.add({severity:'error', summary:'Service Message', detail:'Kiểm tra lại thông tin đăng nhập', life: 3000});
        }
      })
    } else {
      this.messageService.add({severity:'error', summary:'Lỗi đăng ký', detail:'Không được bỏ trống trường dữ liệu'});
    }
  }

 
  handleCheckUser() : void {
    if(this.userForm.valid){
      this.visible = true;
    }
    else {
      this.messageService.add({severity:'error', summary:'Lỗi đăng ký', detail:'Không được bỏ trống trường dữ liệu'});
    }
    
  }
}
