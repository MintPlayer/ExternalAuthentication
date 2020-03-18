import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../entities/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  //#region IsExpanded
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  //#endregion

  level1SubMenu: string = '';
  toggleLevel1Menu(submenu: string) {
    if (this.level1SubMenu === submenu) {
      this.level1SubMenu = '';
    } else {
      this.level1SubMenu = submenu;
    }
    return false;
  }

  @Input() currentUser: User;
  @Output() logoutClicked: EventEmitter<string> = new EventEmitter();
  onLogout() {
    this.logoutClicked.emit();
    this.itemSelected.emit();

    return false;
  }

  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  onItemSelected() {
    this.isExpanded = false;
    this.itemSelected.emit();
  }
}
