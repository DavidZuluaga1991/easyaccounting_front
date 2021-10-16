import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaxServiceService } from './services/tax-service/tax-service.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    TaxServiceService
  ],
  exports: [
    // TaxServiceService
  ]
})
export class CoreModule { }
