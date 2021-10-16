import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LayoutComponent } from './component/layout/layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DatecustomPipe } from './pipes/datecustom/datecustom.pipe';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DateCalendarComponent } from './component/date-calendar/date-calendar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    DatecustomPipe,
    DateCalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutComponent,
    DateCalendarComponent,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    DatecustomPipe
  ]
})
export class SharedModule { }
