import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { nganhRoutes, uploadFiledRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileApiService {
  constructor(private http: HttpClient) {}
  
  uploadFile(file: any): Observable<any> {
    return this.http.post("https://api.fpt.ai/vision/idr/vnm", file, {headers: {
      'api-key': 'Tidp9orBjl3dJ0h73EAO6dCv9Xd5G3Rs'
    }});
  }
  
}
