import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BaseLoginComponent } from '../base-login.component';
import { PwaHelper } from '../../../helpers/pwa.helper';

@Component({
  selector: 'app-twitter-login',
  templateUrl: './twitter-login.component.html',
  styleUrls: ['./twitter-login.component.scss']
})
export class TwitterLoginComponent extends BaseLoginComponent implements OnInit, OnDestroy {

  constructor(@Inject('BASE_URL') baseUrl: string, pwaHelper: PwaHelper) {
    super(baseUrl, 'Twitter', pwaHelper);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dispose();
  }

}
