import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginResult } from '../../../entities/login-result';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['return'] || '/';
    });
  }

  ngOnDestroy() {
  }

  email: string;
  password: string;
  private returnUrl: string = '';
  loginResult: LoginResult = {
    status: true,
    medium: '',
    platform: 'local',
    user: null,
    error: null,
    errorDescription: null
  };

  login() {
    this.accountService.login(this.email, this.password).then((result) => {
      if (result.status === true) {
        this.router.navigateByUrl(this.returnUrl);
        this.loginComplete.emit(result.user);
      } else {
        this.loginResult = result;
      }
    }).catch((error: HttpErrorResponse) => {
      this.loginResult = {
        status: false,
        medium: '',
        platform: 'local',
        user: null,
        error: 'Login attempt failed',
        errorDescription: 'Check your connection'
      };
    });
  }

  socialLoginDone(result: LoginResult) {
    if (result.status) {
      this.accountService.currentUser().then((user) => {
        this.loginComplete.emit(user);
        this.router.navigateByUrl(this.returnUrl);
      });
    } else {
      this.loginResult = result;
    }
  }

  forgotPassword() {
  }

  @Output() loginComplete: EventEmitter<User> = new EventEmitter();
}
