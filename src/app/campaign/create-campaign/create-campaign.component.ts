import { CampaignNotCreatedDialogComponent } from './../../messages/campaign-not-created-dialog/campaign-not-created-dialog.component';
import { CampaignCreatedDialogComponent } from './../../messages/campaign-created-dialog/campaign-created-dialog.component';
import { Campaign, CampaignList } from './../../../models/campaign';
import { CampaignService } from '../campaign.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  campaign: Campaign = new Campaign();
  campaignForm: FormGroup;
  @Input() campaignList: CampaignList[];
  @Output() showCreateCampaign: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addCreatedCampaign: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private campaignService: CampaignService, private dialog: MatDialog){}
  
  ngOnInit(){
    this.campaignForm = new FormGroup({
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
    if(this.campaign.startDate === undefined || this.campaign.endDate === undefined) return false
    if(this.campaign.startDate > this.campaign.endDate) return false
    if(this.campaign.name === undefined || this.campaign.name.length < 1) return false
    if(this.campaign.budgetDto.microAmount === undefined || this.campaign.budgetDto.microAmount < 1) return false
     return true
  }

  submitCampaign(){
    this.createCampagin(this.campaign);   
  }

  campaignNameExist(){
    if(this.campaignList.find(x => x.name === this.campaign.name)) return false;
      return true;
  }

  closeForm(){
    this.showCreateCampaign.emit(false);
  }

  createCampagin(campaign: Campaign){
    this.campaignService.createCampaign(campaign).subscribe(
      data => {
        this.addCreatedCampaign.emit();
        this.showCreateCampaign.emit(false);
        this.campaign = new Campaign();
        this.dialog.open(CampaignCreatedDialogComponent)
    },
      err => {
        this.campaign.budgetDto.microAmount /= 1000000;
        this.dialog.open(CampaignNotCreatedDialogComponent);       
    });
  }
}
