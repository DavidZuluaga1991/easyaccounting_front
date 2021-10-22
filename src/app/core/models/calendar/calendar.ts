
export interface ICalendar {
  date: Date;
  selected?: boolean;
  staticselected?: boolean;
  class?: string;
}

export class Calendar implements ICalendar {
  date: Date;
  selected?: boolean;
  staticselected?: boolean;
  class?: string;

  constructor(calendar: ICalendar) {
      this.date = calendar.date;
      this.selected = calendar.selected;
      this.staticselected = calendar.staticselected;
      this.class = calendar.class;
  }
}
