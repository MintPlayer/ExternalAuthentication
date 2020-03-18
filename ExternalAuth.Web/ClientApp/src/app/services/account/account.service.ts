import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../../entities/user-data';
import { LoginResult } from '../../entities/login-result';
import { User } from '../../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public register(data: UserData) {
    return this.httpClient.post(`${this.baseUrl}/web/Account/register`, data).toPromise();
  }
  public login(email: string, password: string) {
    return this.httpClient.post<LoginResult>(`${this.baseUrl}/web/Account/login`, { email, password }).toPromise();
  }
  public getProviders() {
    return this.httpClient.get<string[]>(`${this.baseUrl}/web/Account/providers`).toPromise();
  }
  public getLogins() {
    return this.httpClient.get<string[]>(`${this.baseUrl}/web/Account/logins`).toPromise();
  }
  public removeLogin(provider: string) {
    return this.httpClient.delete(`${this.baseUrl}/web/Account/logins/${provider}`).toPromise();
  }
  public currentUser() {
    return this.httpClient.get<User>(`${this.baseUrl}/web/Account/current-user`).toPromise();
  }
  public logout() {
    return this.httpClient.post(`${this.baseUrl}/web/Account/logout`, {}).toPromise();
  }
}
