import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminCalendarComponent } from './components/admin-calendar/admin-calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminCalendarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DragDropModule,
    SharedModule
  ]
})
export class DashboardModule { }
