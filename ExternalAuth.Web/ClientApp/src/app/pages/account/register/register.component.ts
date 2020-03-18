import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Guid } from 'guid-typescript';
import { UserData } from '../../../entities/user-data';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account/account.service';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private accountService: AccountService) {
  }

  public data: UserData = {
    user: {
      id: Guid.createEmpty()['value'],
      userName: '',
      email: '',
      pictureUrl: ''
    },
    password: '',
    passwordConfirmation: ''
  };

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public register() {
    this.accountService.register(this.data).then((result) => {
      this.accountService.login(this.data.user.email, this.data.password).then((login_result) => {
        if (login_result.status === true) {
          this.router.navigate(['/']);
          this.loginComplete.emit(login_result.user);
        } else {
          debugger;
        }
      }).catch((error) => {
        console.error('Could not register', error);
      });
    }).catch((error) => {
      console.error('Could not register', error);
    });
  }

  @Output() loginComplete: EventEmitter<User> = new EventEmitter();
}
