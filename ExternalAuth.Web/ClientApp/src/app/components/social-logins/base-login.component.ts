import { Input, Output, EventEmitter, Inject } from '@angular/core';
import { LoginResult } from '../../entities/login-result';
import { PwaHelper } from '../../helpers/pwa.helper';

export class BaseLoginComponent {
  protected authWindow: Window;
  protected listener: any;
  public isOpen: boolean = false;

  @Input() public action: 'add' | 'connect';
  @Output() public LoginSuccessOrFailed: EventEmitter<LoginResult> = new EventEmitter();

  constructor(private baseUrl: string, private platform: string, private pwaHelper: PwaHelper) {
    this.listener = this.handleMessage.bind(this);
    if (window !== undefined) {
      if (window.addEventListener) {
        window.addEventListener('message', this.listener, false);
      } else {
        (<any>window).attachEvent('onmessage', this.listener);
      }
    }
  }

  protected dispose() {
    if (window !== undefined) {
      if (window.removeEventListener) {
        window.removeEventListener('message', this.listener, false);
      } else {
        (<any>window).detachEvent('onmessage', this.listener);
      }
    }
  }

  showPopup() {
    if (window !== undefined) {
      var medium = this.pwaHelper.isPwa() ? 'pwa' : 'web';

      // When the pwa is installed, and the app is visited from a browser,
      // Chrome will open the PWA instead of the current medium
      this.authWindow = window.open(`${this.baseUrl}/web/Account/${this.action}/${medium}/${this.platform}`, '_system', 'width=600,height=400');

      // https://stackoverflow.com/questions/55452230/why-window-open-displays-a-blank-screen-in-a-desktop-pwa-looks-obfuscated

      this.isOpen = true;
      var timer = setInterval(() => {
        if (this.authWindow.closed) {
          this.isOpen = false;
          clearInterval(timer);
        }
      });
    }
  }

  handleMessage(event: Event) {
    const message = event as MessageEvent;
    // Only trust messages from the below origin.
    if (!this.baseUrl.startsWith(message.origin)) return;

    // Filter out Augury
    if (message.data.messageSource != null)
      if (message.data.messageSource.indexOf('AUGURY_') > -1) return;
    // Filter out any other trash
    if (message.data == '' || message.data == null) return;

    const result = <LoginResult>JSON.parse(message.data);
    var medium = this.pwaHelper.isPwa() ? 'pwa' : 'web';
    if ((result.platform === this.platform) && (result.medium === medium)) {
      this.authWindow.close();
      this.LoginSuccessOrFailed.emit(result);
    }
  }
}
