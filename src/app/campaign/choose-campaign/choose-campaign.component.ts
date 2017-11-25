import { MatDialog } from '@angular/material';
import { CampaignSelectedDialogComponent } from './../../dialogs/campaign-selected-dialog/campaign-selected-dialog.component';
import { CampaignService } from './../campaign.service';
import { CampaignDto, CampaignListItem } from './../../../models/campaign';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-campaign',
  templateUrl: './choose-campaign.component.html',
  styleUrls: ['./choose-campaign.component.css']
})
export class ChooseCampaignComponent implements OnInit {
  campaign: CampaignListItem = new CampaignListItem();
  campaignList: CampaignListItem[] = [];
  visible: boolean = false;

  constructor(private campaignService: CampaignService, private dialog: MatDialog) { }

  ngOnInit() {
    this.campaignList = this.campaignService.getCampaigns();
    this.addCampaignToList();
  }

  addCampaignToList(){
    this.campaignService.addCreatedCampaignToList.subscribe((data: CampaignListItem) => {
      this.campaignList.push(data);
    });
  }
  
  toggleCreateCampaign(){
    this.campaignService.showCreateCampaignComponent.next(true);
  }

  setChosenCampaign(){   
    this.campaignService.setChosenCampaign.next(this.campaign);
    this.campaignService.toggleVisibility.next(false);
    this.dialog.open(CampaignSelectedDialogComponent);
  }
} 

