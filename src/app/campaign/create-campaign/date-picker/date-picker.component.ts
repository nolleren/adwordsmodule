import { CampaignService } from './../../campaign.service';
import { Component } from '@angular/core';
import { Dates } from '../../../../models/Dates';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-date-picker',
  templateUrl: 'date-picker.component.html'
})
export class DatepickerComponent {
  selectedStartDate: Date;
  selectedEndDate: Date;
  startDate: Date = new Date();
  endDate: Date = new Date();
  datesStart: Dates = new Dates();
  datesEnd: Dates = new Dates();

  constructor(private adapter: DateAdapter<any>, private campaignService: CampaignService){
    this.adapter.setLocale("da");
  }

  ngOnInit() {
    this.setPickRangeOnDatesStart();
    this.setPickRangeOnDatesEnd();

    this.updateStartDateForEndDate();
  }

  updateStartDateForEndDate(){
    this.campaignService.dataDateOne$.subscribe(data => {
      this.datesEnd.startDate = data;
    });
  }

  setPickRangeOnDatesStart(){
    this.datesStart = {
      startDate: this.startDate,
      endDate: new Date(this.startDate.getFullYear() + 5, 0, 1)
    };
  }

  setPickRangeOnDatesEnd(){
    this.datesEnd = {
      startDate: this.endDate,
      endDate: new Date(this.endDate.getFullYear() + 5, 0, 1)
    };
  }

  updatePickedDate(){
    this.campaignService.setDateOne(this.selectedStartDate);
    this.campaignService.setDateTwo(this.selectedEndDate);
  }
}