import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaxCalendar } from '../../models/tax-calendar/tax-calendar';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class TaxServiceService extends BaseHttpService<TaxCalendar> {

  constructor(protected http: HttpClient) {
    super(http, environment.endpoint);
  }
}
