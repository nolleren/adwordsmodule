import { Campaign } from './../../../models/campaign';
import { CreateCampaignService } from './create-campaign.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  campaign: Campaign = new Campaign();
  signupForm: FormGroup;

  constructor(private campaignService: CreateCampaignService){}
  
  ngOnInit(){
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'microAmount': new FormControl(null, [ Validators.required, Validators.min(1) ])
    });
  }

  updateStartDate(event) {
    this.campaign.startDate = event;
  }

  updateEndDate(event) {
    this.campaign.endDate = event;
  }

  formIsValid(){
    if(this.campaign.startDate === undefined || this.campaign.endDate === undefined ||
      (this.campaign.startDate > this.campaign.endDate) || 
       this.campaign.name === undefined || this.campaign.name.length < 1 ||
      (this.campaign.budgetDto.microAmount < 1 || this.campaign.budgetDto.microAmount === undefined)) {
      return false
    }
     return true
  }

  submitCampaign(){
    this.createCampagin(this.campaign);
  }

  createCampagin(campaign: Campaign){
    this.campaignService.createCampaign(campaign).subscribe((result) => {
      console.log(result);
    });
    this.signupForm.reset();
    this.campaign = new Campaign();
  }
}
