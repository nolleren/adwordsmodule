import { MatDialog } from '@angular/material';
import { CampaignSelectedDialogComponent } from './../../dialogs/campaign-selected-dialog/campaign-selected-dialog.component';
import { Toggle } from './../../../models/toggle';
import { CampaignService } from './../campaign.service';
import { CampaignDto, CampaignListItem } from './../../../models/campaign';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-campaign',
  templateUrl: './choose-campaign.component.html',
  styleUrls: ['./choose-campaign.component.css']
})
export class ChooseCampaignComponent implements OnInit {
  campaign: CampaignDto = new CampaignDto();
  campaignList: CampaignListItem[] = [];
  toggle: Toggle = new Toggle();

  constructor(private campaignService: CampaignService, private dialog: MatDialog) { }

  ngOnInit() {
    this.campaignList = this.campaignService.getCampaigns();
    this.addCampaignToList();
  }

  addCampaignToList(){
    this.campaignService.dataCreatedCampaign$.subscribe(
      data => {
        this.campaignList.push(data); 
      });
  }
  
  toggleCreateCampaign(){
    this.toggle.value = true;
    this.campaignService.toggle(this.toggle);
  }

  setChosenCampaign(){   
    this.campaignService.setChosenCampaign(this.campaign);
    this.dialog.open(CampaignSelectedDialogComponent);
  }
} 

