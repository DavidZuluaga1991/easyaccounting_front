
export interface ICalendar {
  date: Date;
  selected?: boolean;
  class?: string;
}

export class Calendar implements ICalendar {
  date: Date;
  selected?: boolean;
  class?: string;

  constructor(calendar: ICalendar) {
      this.date = calendar.date;
      this.selected = calendar.selected;
      this.class = calendar.class;
  }
}
