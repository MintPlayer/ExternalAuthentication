import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService) {
    this.accountService.getProviders().then((providers) => {
      this.loginProviders = providers;
    }).catch((error) => {
      alert("Could not retrieve the login providers");
    });
    this.accountService.getLogins().then((logins) => {
      this.userLogins = logins;
    }).catch((error) => {
      alert("Could not retrieve your login accounts");
    });
  }

  loginProviders: string[] = [];
  userLogins: string[] = [];

  socialLoginDone(result: LoginResult) {
    if (result.status) {
      this.accountService.getLogins().then((logins) => {
        this.userLogins = logins;
      });
    } else {
    }
  }

  removeSocialLogin(provider: string) {
    this.accountService.removeLogin(provider).then(() => {
      this.userLogins.splice(this.userLogins.indexOf(provider), 1);
    });
  }

  ngOnInit() {
  }

}
