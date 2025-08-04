import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { ResponseI } from '@core/utils';
import { UserTokenEntity } from '@modules/auth/domain/entities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  login(email: string): Observable<ResponseI<UserTokenEntity>> {
    return this.http.get<ResponseI<UserTokenEntity>>(`${this.url}api/users/${email}`);
  }

  createUser(email: string): Observable<ResponseI<UserTokenEntity>> {
    return this.http.post<ResponseI<UserTokenEntity>>(`${this.url}api/users`, { email });
  }
}