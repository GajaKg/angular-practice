import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IUserLogin, IUserRegister } from '../../models/User.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly authBaseUrl = "/api/account";

  registerUser(user: IUserRegister): Observable<IUser> {
    return this.http.post<IUser>(`${this.authBaseUrl}/register`, user);
  }

  loginUser(user: IUserLogin): Observable<IUser> {
    return this.http.post<IUser>(`${this.authBaseUrl}/login`, user)
  }
}
