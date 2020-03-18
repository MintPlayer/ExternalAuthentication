import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { AccountModule } from './account/account.module';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [CounterComponent, FetchDataComponent, HomeComponent, NotFoundComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AccountModule
  ]
})
export class PagesModule { }
