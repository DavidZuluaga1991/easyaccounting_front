import { Component, OnInit } from '@angular/core';
import { Calendar } from 'src/app/core/models/calendar/calendar';
import { TaxCalendar } from 'src/app/core/models/tax-calendar/tax-calendar';
import { TaxServiceService } from 'src/app/core/services/tax-service/tax-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public dateInit = new Date();
  public dayNames = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sab'];
  public numDays: Calendar[] = [];
  public selectDay?: TaxCalendar;
  public viewMore: boolean = false;
  public historyCalendar: TaxCalendar[] = [];

  constructor(private calendarService: TaxServiceService) { }

  ngOnInit(): void {
    this.calendarService.get('calendar').subscribe((data) => {
      this.historyCalendar = data;
    });
  }

  private isEqualDate(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  }
  public selectDate(event: Date) {
    this.selectDay = undefined;
    const f = this.historyCalendar.filter((x) => {
      const date = new Date(x.date);
      return this.isEqualDate(date, event);
    });
    console.log(event, f)
    if (f.length > 0) {
      this.selectDay = {
        date: f[0].date,
        description: f[0].description
      }
      // calendar.description = f[0].description;
    }
  }
}
