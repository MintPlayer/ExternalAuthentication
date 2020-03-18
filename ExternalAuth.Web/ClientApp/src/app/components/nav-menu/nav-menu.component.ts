import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  level1SubMenu: string = '';
  toggleLevel1Menu(submenu: string) {
    if (this.level1SubMenu === submenu) {
      this.level1SubMenu = '';
    } else {
      this.level1SubMenu = submenu;
    }
    return false;
  }
}
