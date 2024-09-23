import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';
import { FileService } from './file.service';
import { AppInjector } from '../../../module/app.module';

@Component({
  selector: 'app-common-file',
  templateUrl: './common-file.component.html',
  styleUrls: ['./common-file.component.scss'],
})
export class CommonFileComponent extends BaseComponent {
  @Input() loai_dinh_kem: any; // decorate the property with @Input()
  @Input() id_nguon: any; // decorate the property with @Input()
  @Input() isDisable: any=false; // decorate the property with @Input()
  fileService: FileService;
  currentInput: any;
  constructor() {
    super();
    this.fileService = AppInjector.get(FileService);
  }
  FilesData: any = [];
  async ngOnInit(): Promise<void> {
    await this.getList();
  }
  showDeleteFileModal: any = false;
  showUpdateFileModal: any = false;
  ID_dinh_kem: any;

  async getList() {
    this.fileService
      .getList(this.id_nguon, this.loai_dinh_kem, await this.getToken())
      .subscribe((res: any) => {
        this.FilesData = res.ListData;
      });
  }

  async deleteFile() {
    this.fileService
      .Delete( await this.getToken(),this.ID_dinh_kem)
      .subscribe((res: any) => {
        if(res.Status==1)
        {
          this.toggleDeletemodal();
          this.getList();
          this.toastr.success(res.Message);
        }
        else{
          this.toastr.warning(res.Message);
        }
        
      });
  }
  async UploadFile() {
    if (!this.currentInput) {
      this.toastr.warning("Vui lòng chọn file import!");
      return;
    }
    const formData = new FormData();
    formData.append("file", this.currentInput);
    formData.append("ID_nguon", this.id_nguon);
    formData.append("Loai_dinh_kem", this.loai_dinh_kem);
    this.fileService
      .Insert(await this.getToken(),formData)
      .subscribe((res: any) => {
        if(res.Status==1)
        {
          this.toggleUploadmodal();
          this.getList();
          this.toastr.success(res.Message);
        }
        else{
          this.toastr.warning(res.Message);
        }
        
      });
  }
  openDeleteFileModal(id: any) {
    this.ID_dinh_kem = id;
    this.toggleDeletemodal();
  }
  toggleDeletemodal() {
    this.showDeleteFileModal = !this.showDeleteFileModal;
  }
  toggleUploadmodal() {
    this.showUpdateFileModal = !this.showUpdateFileModal;
  }
  onFileSelected(event:any) {
    this.currentInput = event.target.files[0];
  }
}
