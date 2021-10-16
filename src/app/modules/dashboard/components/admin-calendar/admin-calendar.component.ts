import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DescriptionData } from 'src/app/core/models/description-data/description-data';
import { TaxCalendar } from 'src/app/core/models/tax-calendar/tax-calendar';
import { TaxServiceService } from 'src/app/core/services/tax-service/tax-service.service';
import { Utils } from 'src/app/core/utils/utils';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminCalendarComponent implements OnInit {
  @Input() TypeAdmin: number = 1;
  private utils: Utils = new Utils();
  public formGroup: FormGroup = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    description: new FormArray([])
  });

  private historyCalendar: TaxCalendar[] = [];


  constructor(private fb: FormBuilder, private calendarService: TaxServiceService) { }

  ngOnInit(): void {
    this.calendarService.get('calendar').subscribe((data) => {
      this.historyCalendar = data;
    });
  }

  private initFormGroup(taxcalendar?: TaxCalendar) {
    this.formGroup.patchValue({
      date: taxcalendar ? taxcalendar.date : new Date,
      description: []
    });
    this.description.clear();
    taxcalendar?.description.forEach(d => {
      this.addDescription(d);
    });
  }

  get description() {
    return this.formGroup.get('description') as FormArray;
  }

  private formGroupCustom(description?: DescriptionData): FormGroup {
    switch (this.TypeAdmin) {
      case 1:
        return this.fb.group({
          description: new FormControl(description ? description.description : null, [Validators.required])
        });
        break;
      default:
        return this.fb.group({
          description: new FormControl(description ? description.description : null, [Validators.required]),
          file: new FormControl(null, [Validators.required])
        });
        break;
    }
  }

  public addDescription(description?: DescriptionData) {
    this.description.push(this.formGroupCustom(description));
  }

  public removeDescription(descriptionIndex: number) {
    this.description.removeAt(descriptionIndex);
  }

  public onDropped(event: CdkDragDrop<any>) {
    const anterior = event.previousIndex;
    const actual = event.currentIndex;
    this.moveItemInFormArray(this.description, anterior, actual);
  }

  public selectDate(event: Date) {
    let tax: TaxCalendar = { date: event, description: [] };
    this.historyCalendar.forEach(h => {
      if (this.utils.isEqualDate(new Date(h.date), event)) {
        tax = h;
      }
    });
    this.initFormGroup(tax);
  }

  /**
 * Moves an item in a FormArray to another position.
 * @param formArray FormArray instance in which to move the item.
 * @param fromIndex Starting index of the item.
 * @param toIndex Index to which he item should be moved.
 */
  moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const from = this.clamp(fromIndex, formArray.length - 1);
    const to = this.clamp(toIndex, formArray.length - 1);

    if (from === to) {
      return;
    }

    const previous = formArray.at(from);
    const current = formArray.at(to);
    formArray.setControl(to, previous);
    formArray.setControl(from, current);
  }
  /** Clamps a number between zero and a maximum. */
  clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }

}
