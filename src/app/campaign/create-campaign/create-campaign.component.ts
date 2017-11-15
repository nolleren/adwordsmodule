import { Toggle } from './../../../models/toggle';
import { CampaignNotCreatedDialogComponent } from './../../dialogs/campaign-not-created-dialog/campaign-not-created-dialog.component';
import { CampaignCreatedDialogComponent } from './../../dialogs/campaign-created-dialog/campaign-created-dialog.component';
import { CampaignDto, CampaignListItem } from './../../../models/campaign';
import { CampaignService } from '../campaign.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  campaign: CampaignDto = new CampaignDto();
  campaignForm: FormGroup;
  campaignList: CampaignListItem[];
  microAmount?: number;
  toggle: Toggle = new Toggle();

  constructor(private campaignService: CampaignService, 
              private dialog: MatDialog,){}
  
  ngOnInit(){
    this.campaignList = this.campaignService.getCampaigns();
    this.createFormGroup();   
    this.setDate();
    this.addCampaignToList();
  }

  createFormGroup(){
    this.campaignForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'microAmount': new FormControl(null, [ Validators.required, Validators.min(1) ])
    });
  }

  addCampaignToList(){
    this.campaignService.dataCreatedCampaign$.subscribe(
      data => {
        this.campaignList.push(data); 
      });
  }

  toggleCreateCampaign(){
    this.toggle.value = false;
    this.campaignService.toggle(this.toggle)
  }

  setDate(){
    this.campaignService.dataDateOne$.subscribe(data => { this.campaign.startDate = data });
    this.campaignService.dataDateTwo$.subscribe(data => { this.campaign.endDate = data });
  }
  
  campaignNameExist(){
    if(this.campaignList.find(x => x.name === this.campaign.name)) return false;
      return true;
  }

  submitCampaign(){
    this.createCampagin(this.campaign);   
  }

  createCampagin(campaign: CampaignDto){
    this.campaign.budget.microAmount = this.microAmount;
    this.campaignService.createCampaign(campaign).subscribe(
      data => {
        let campaign: CampaignListItem = {
          id: data.id,
          name: data.name
        };
        this.addCreatedCampaignToList(campaign);
        this.toggleCreateCampaign();
        this.campaign = new CampaignDto();
        this.dialog.open(CampaignCreatedDialogComponent)
    },
      err => {
        this.campaign.budget.microAmount /= 1000000;
        this.dialog.open(CampaignNotCreatedDialogComponent);       
    });
  }

  addCreatedCampaignToList(campaign: CampaignListItem){   
    this.campaignService.addCreatedCampaignToList(this.campaign);
  }
}
