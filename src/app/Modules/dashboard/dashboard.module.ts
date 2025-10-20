import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from '../../Shared/header/header.component';
import { SidebarComponent } from '../../Shared/sidebar/sidebar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
