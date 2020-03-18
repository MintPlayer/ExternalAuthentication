import { Component, ElementRef } from '@angular/core';
import { User } from './entities/user';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  currentUser: User = null;

  constructor(private accountService: AccountService) {
    this.accountService.currentUser().then((user) => {
      this.currentUser = user;
    }).catch((error) => {
      this.currentUser = null;
    });
  }

  loginCompleted = (user: User) => {
    this.currentUser = user;
  }

  logoutClicked() {
    this.accountService.logout().then(() => {
      this.currentUser = null;
    }).catch((error) => {
      console.error('Could not logout', error);
    });
  }

  routingActivated(element: ElementRef) {
    // Login complete
    if (element instanceof LoginComponent) {
      element.loginComplete.subscribe(this.loginCompleted);
    } else if (element instanceof RegisterComponent) {
      element.loginComplete.subscribe(this.loginCompleted);
    }
  }

  routingDeactivated(element: ElementRef) {
    // Login complete
    if (element instanceof LoginComponent) {
      element.loginComplete.unsubscribe();
    } else if (element instanceof RegisterComponent) {
      element.loginComplete.unsubscribe();
    }
  }
}
