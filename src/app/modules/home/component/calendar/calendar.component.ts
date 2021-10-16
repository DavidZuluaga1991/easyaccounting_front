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
  public selectDay?: Calendar;
  public viewMore: boolean = false;
  public historyCalendar: TaxCalendar[] = [];

  constructor(private calendarService: TaxServiceService) { }

  ngOnInit(): void {
    this.calendarService.get('calendar').subscribe((data) => {
      this.historyCalendar = data;
      this.getSelectCalendar(this.dateInit);
    });
  }

  private getSelectCalendar(date: Date) {
    this.numDays = [];
    const initDate: Date = new Date(date);
    const finalDate: Date = new Date(date);
    initDate.setDate(1);
    finalDate.setDate(1);
    finalDate.setMonth(initDate.getMonth() + 1);
    finalDate.setDate(0);
    this.getDaysMonthBack(initDate);
    this.getDaysMonth(finalDate);
    this.getDaysMonthNext(finalDate);
    this.addDescription();
  }

  private getDaysMonthBack(initDate: Date): void {
    const d = new Date(initDate);
    d.setDate(0);
    let j = 0;
    for (let i = initDate.getDay() - 1; i >= 0; i--) {
      const date = new Date(initDate);
      date.setMonth(initDate.getMonth() - 1);
      date.setDate(d.getDate() - i);
      const day: Calendar = {
        date: date,
        selected: false,
        class: 'last'
      }
      this.numDays.push(day);
      j++;
    }
  }

  private getDaysMonth(finalDate: Date): void {
    let j = this.numDays.length;
    for (let i = 1; i <= finalDate.getDate(); i++) {
      const date = new Date(finalDate);
      date.setDate(i);
      const day: Calendar = {
        date: date,
        // selectable: false,
        selected: this.isEqualDate(date, this.dateInit),
        // description: []
      }
      if (day.selected) {
        this.selectDay = day;
      }
      this.numDays.push(day);
      j++;
    }
  }

  private getDaysMonthNext(date: Date): void {
    let j = this.numDays.length;
    let cont = 1;
    for (let i = date.getDay(); i < 6; i++) {
      const tempdate = new Date(date);
      const month = tempdate.getMonth() + 1;
      tempdate.setDate(cont);
      tempdate.setMonth(month);
      const day: Calendar = {
        date: tempdate,
        selected: false,
        class: 'last'
      }
      this.numDays.push(day);
      cont++;
      j++;
    }
  }
  public changeMonth(num: number) {
    this.dateInit.setMonth(this.dateInit.getMonth() + num);
    //const date = new Date(this.dateInit);
    this.dateInit = new Date(this.dateInit);
    this.getSelectCalendar(this.dateInit);
  }
  public changeDate(date: Date) {
    this.dateInit = new Date(date);
    this.getSelectCalendar(this.dateInit);
  }

  private addDescription() {
    this.numDays.forEach(calendar => {
      const f = this.historyCalendar.filter((x) => {
        const date = new Date(x.date);
        return this.isEqualDate(date, calendar.date);
      });
      // if (f.length > 0) {
      //   calendar.description = f[0].description;
      // }
    });
  }
  private isEqualDate(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  }
}
