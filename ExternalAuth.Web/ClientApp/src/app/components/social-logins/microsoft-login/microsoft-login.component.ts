import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BaseLoginComponent } from '../base-login.component';
import { PwaHelper } from '../../../helpers/pwa.helper';

@Component({
  selector: 'app-microsoft-login',
  templateUrl: './microsoft-login.component.html',
  styleUrls: ['./microsoft-login.component.scss']
})
export class MicrosoftLoginComponent extends BaseLoginComponent implements OnInit, OnDestroy {
  constructor(@Inject('BASE_URL') baseUrl: string, pwaHelper: PwaHelper) {
    super(baseUrl, 'Microsoft', pwaHelper);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dispose();
  }
}

