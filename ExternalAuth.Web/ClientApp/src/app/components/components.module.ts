import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavMenuComponent
  ]
})
export class ComponentsModule { }
