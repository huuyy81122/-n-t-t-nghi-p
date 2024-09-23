import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { donHangRoutes, nganhRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonHangApiService {
  constructor(private http: _HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getServicesTypeById);
  }
  getWeight(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getWeightTypeById);
  }
  getTransport(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getTransportById);
  }
  getTransportById(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getTransportById + '/' + id);
  }
  getAll(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getAll);
  }
  getById(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getdetail+ '/' + id);
  }
  create(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + donHangRoutes.create, model);
  }
  update(model: any): Observable<any> {
    return this.http.put(environment.api.baseUrl + donHangRoutes.update, model);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(environment.api.baseUrl + donHangRoutes.delete+ '/' + id);
  }
  getPrice(idServices: any, idTransport: any, idWeight: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + donHangRoutes.getPrice, {transportTypeId: idTransport,serviceTypeId: idServices, weightTypeId: idWeight});
  }
  getTinh(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getTinh);
  }
  getHuyen(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getHuyen);
  }
  getXa(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getXa);
  }
  capNhatTrangThai(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + donHangRoutes.updateStatus, model);
  }
  getDonHangByMa(maDonHang: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.getByMaDonHang+ "?maDonHang="+maDonHang);
  }
  ganShipper(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + donHangRoutes.ganShipper, model);
  }
  deXuatShipper(orderId: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.deXuatShipper + "/"+orderId);
  }
  thongKe(): Observable<any> {
    return this.http.get(environment.api.baseUrl + donHangRoutes.thongKe);
  }
}
