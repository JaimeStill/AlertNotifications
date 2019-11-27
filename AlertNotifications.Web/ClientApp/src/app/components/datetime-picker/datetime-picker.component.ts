import {
  Component,
  Input,
  ViewChild
} from '@angular/core';

import {
  MatDatepicker,
  MatDatepickerInputEvent,
  MatSliderChange
} from '@angular/material';

@Component({
  selector: 'datetime-picker',
  templateUrl: 'datetime-picker.component.html'
})
export class DatetimePickerComponent {
  private today = new Date(Date.now());
  @ViewChild(MatDatepicker, { static: false }) picker: MatDatepicker<Date>;

  @Input() date = new Date(Date.now());
  @Input() hourMax = 23;
  @Input() hourMin = 0;
  @Input() hourStep = 1;
  @Input() hourThumb = true;
  @Input() hourInterval: number | string = 'auto';
  @Input() minuteMax = 55;
  @Input() minuteMin = 0;
  @Input() minuteStep = 5;
  @Input() minuteThumb = true;
  @Input() minuteInterval: number | string = 1;

  constructor() {
    if (!this.date || !Date.parse(this.date.toString())) {
      this.date = new Date(Date.now());
    }
  }

  dateChanged = (event: MatDatepickerInputEvent<Date>) => event.value ?
    this.setDate(event.value) :
    this.setDate(this.today);

  setDate = (event: Date) => {
    this.date.setFullYear(event.getFullYear());
    this.date.setMonth(event.getMonth());
    this.date.setDate(event.getDate());
    this.picker.select(this.date);
  }

  setHours = (event: MatSliderChange) => this.date.setHours(event.value);
  setMinutes = (event: MatSliderChange) => this.date.setMinutes(event.value);
}
