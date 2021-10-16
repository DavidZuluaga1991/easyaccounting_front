import { DescriptionData } from "../description-data/description-data";

export interface ITaxCalendar {
  date: Date;
  description: DescriptionData[];
}

export class TaxCalendar implements ITaxCalendar {
  date: Date;
  description: DescriptionData[];

  constructor(tax: ITaxCalendar) {
      this.date = tax.date;
      this.description = tax.description;
  }

}
