import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { SocialLoginsModule } from './social-logins/social-logins.module';



@NgModule({
  declarations: [
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SocialLoginsModule
  ],
  exports: [
    NavMenuComponent
  ]
})
export class ComponentsModule { }
