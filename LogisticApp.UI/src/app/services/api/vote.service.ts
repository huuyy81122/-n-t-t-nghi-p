import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { nganhRoutes, voteRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteApiService {
  constructor(private http: _HttpClient) {}

  getVoteForShipper(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + voteRoutes.getVoteForShipper + "?idShipper="+ id);
  }
  
  createVote(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + voteRoutes.createVote, model);
  }
}
