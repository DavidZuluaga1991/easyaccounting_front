export interface IDescriptionData {
  order: number;
  description: string;
}

export class DescriptionData implements IDescriptionData {
  order: number;
  description: string;

  constructor(calendar: IDescriptionData) {
      this.order = calendar.order;
      this.description = calendar.description;
  }
}
