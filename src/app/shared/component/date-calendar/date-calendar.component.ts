import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Calendar } from 'src/app/core/models/calendar/calendar';
import { Utils } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-date-calendar',
  templateUrl: './date-calendar.component.html',
  styleUrls: ['./date-calendar.component.scss']
})
export class DateCalendarComponent implements OnInit, OnChanges {

  // public dateInit = new Date();
  public dayNames = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sab'];
  public days: Calendar[] = [];
  public daySelect?: Calendar;
  public utils: Utils = new Utils();
  @Input() public dateInit = new Date();
  @Input() public changesMonth = new Date();
  @Input() public selectDate: Date[] = [];
  @Output() public selectDay = new EventEmitter<Date>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.getSelectCalendar(this.dateInit);
  }


  private getSelectCalendar(date: Date) {
    this.days = [];
    const initDate: Date = new Date(date);
    const finalDate: Date = new Date(date);
    initDate.setDate(1);
    finalDate.setDate(1);
    finalDate.setMonth(initDate.getMonth() + 1);
    finalDate.setDate(0);
    this.getDaysMonthBack(initDate);
    this.getDaysMonth(finalDate);
    this.getDaysMonthNext(finalDate);
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
        staticselected: this.selectDate.some(x => x === date),
        selected: false,
        class: 'last',
      };
      console.log(day)
      this.days.push(day);
      j++;
    }
  }

  private getDaysMonth(finalDate: Date): void {
    let j = this.days.length;
    for (let i = 1; i <= finalDate.getDate(); i++) {
      const date = new Date(finalDate);
      date.setDate(i);
      const day: Calendar = {
        date: date,
        selected: this.utils.isEqualDate(date, this.dateInit),
        staticselected: this.selectDate.some(x => this.utils.isEqualDate(date, x))
      }
      console.log(day)
      if (day.selected) {
        this.daySelect = day;
      }
      this.days.push(day);
      j++;
    }
  }

  private getDaysMonthNext(date: Date): void {
    let j = this.days.length;
    let cont = 1;
    for (let i = date.getDay(); i < 6; i++) {
      const tempdate = new Date(date);
      const month = tempdate.getMonth() + 1;
      tempdate.setDate(cont);
      tempdate.setMonth(month);
      const day: Calendar = {
        date: tempdate,
        selected: false,
        staticselected: this.selectDate.some(x => x === date),
        class: 'last'
      }
      this.days.push(day);
      cont++;
      j++;
    }
  }
  public changeMonth(num: number) {
    this.dateInit.setMonth(this.dateInit.getMonth() + num);
    //const date = new Date(this.dateInit);
    this.dateInit = new Date(this.dateInit);
    this.selectDay.emit(this.dateInit);
    this.getSelectCalendar(this.dateInit);
  }
  public changeDate(date: Date) {
    const tempDate = new Date(this.dateInit);
    this.dateInit = new Date(date);
    if (tempDate.getMonth() !== date.getMonth()) {
      this.getSelectCalendar(this.dateInit);
    } else {
      this.days.forEach(d => {
        d.selected = this.utils.isEqualDate(this.dateInit, d.date);
      });
    }
    this.selectDay.emit(date);
  }

}
