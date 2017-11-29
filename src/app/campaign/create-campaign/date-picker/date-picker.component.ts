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
  date: Date = new Date();
  startDate: Dates = new Dates();
  endDate: Dates = new Dates();

  constructor(private adapter: DateAdapter<any>, private campaignService: CampaignService){
    this.adapter.setLocale("da");
  }

  ngOnInit() {
    this.setPickRangeOnDatesStart();
    this.setPickRangeOnDatesEnd();

    this.updateStartDateForEndDate();
  }

  updateStartDateForEndDate(){
    this.campaignService.startDate.subscribe((data: Date) => {
      this.endDate.startDate = data;
      if(this.selectedEndDate < data)
        this.selectedEndDate = data;
    })
  }

  setPickRangeOnDatesStart(){
    this.startDate = {
      startDate: this.date,
      endDate: new Date(this.date.getFullYear() + 5, 0, 1)
    };
  }

  setPickRangeOnDatesEnd(){
    this.endDate = {
      startDate: this.date,
      endDate: new Date(this.date.getFullYear() + 5, 0, 1)
    };
  }

  updatePickedDate(){
    this.campaignService.startDate.next(this.selectedStartDate);
    this.campaignService.endDate.next(this.selectedEndDate);
  }
}