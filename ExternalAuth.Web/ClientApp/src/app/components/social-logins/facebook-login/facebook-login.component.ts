import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BaseLoginComponent } from '../base-login.component';
import { PwaHelper } from '../../../helpers/pwa.helper';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent extends BaseLoginComponent implements OnInit, OnDestroy {
  constructor(@Inject('BASE_URL') baseUrl: string, pwaHelper: PwaHelper) {
    super(baseUrl, 'Facebook', pwaHelper);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dispose();
  }
}
