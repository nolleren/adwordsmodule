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
  visible: boolean = false;

  constructor(private campaignService: CampaignService, 
              private dialog: MatDialog,){}
  
  ngOnInit(){
    this.campaignList = this.campaignService.getCampaigns();
    this.createFormGroup();   
    this.setDates();
    this.addCampaignToList();
  }

  createFormGroup(){
    this.campaignForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'microAmount': new FormControl(null, [ Validators.required, Validators.min(1) ])
    });
  }

  addCampaignToList(){
    this.campaignService.addCreatedCampaignToList.subscribe((data: CampaignListItem) => {
      this.campaignList.push(data);
    });
  }

  toggleCreateCampaign(){
    this.campaignService.showCreateCampaignComponent.next(false);
  }

  setDates(){
    this.campaignService.startDate.subscribe((data: Date) => { this.campaign.startDate = data });
    this.campaignService.endDate.subscribe((data: Date) => { this.campaign.endDate = data });
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
        let newCampaignListItem: CampaignListItem = {
          id: data.value[0].id,
          name: data.value[0].name,
          microAmount: data.value[0].budget.amount.microAmount
        };
        this.campaignService.addCreatedCampaignToList.next(newCampaignListItem);       
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
    this.campaignService.addCreatedCampaignToList.next(campaign);
  }
}
