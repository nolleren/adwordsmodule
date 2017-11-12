import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Dates } from '../../../../models/Dates';
import { DateAdapter } from '@angular/material';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-date-picker',
  templateUrl: 'date-picker.component.html'
})
export class DatepickerComponent {
  @Input() selectedDate: Date;
  @Output() dateChanged = new EventEmitter<Date>();
  date: Date;
  dates: Dates;

  constructor(private adapter: DateAdapter<any>){
    this.adapter.setLocale("da");
  }

  ngOnInit() {
      this.date = new Date();
      this.dates = {
        startDate: this.date,
        endDate: new Date(this.date.getFullYear() + 5, 0, 1)
      };
    }

  updatePickedDate(){
    this.dateChanged.emit(this.selectedDate);
  }
}