import { CampaignComponent } from './../campaign.component';
import { ListService } from './../../list/list.service';
import { MatDialog } from '@angular/material';
import { CampaignSelectedDialogComponent } from './../../dialogs/campaign-selected-dialog/campaign-selected-dialog.component';
import { CampaignService } from './../campaign.service';
import { CampaignDto, CampaignListItem } from './../../../models/campaign';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { empty } from 'rxjs/Observer';

@Component({
  selector: 'app-choose-campaign',
  templateUrl: './choose-campaign.component.html',
  styleUrls: ['./choose-campaign.component.css']
})
export class ChooseCampaignComponent implements OnInit {
  campaign: CampaignListItem = new CampaignListItem();
  campaignList: CampaignListItem[] = [];
  visible: boolean = false;
  disableButtons: boolean = false;

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

  deleteCampaign(){
    this.campaignService.deleteCampaign(this.campaign).subscribe((data) => {
      this.campaignList = this.campaignList.filter(campaign => campaign.id !== data.value[0].baseCampaignId);
      this.campaign = new CampaignListItem();
    });
  }

  toggleCreateCampaign(){
    this.campaignService.showCreateCampaignComponent.next(true);
  }

  campaignIsChosen(){
    let isMyObjectEmpty = Object.keys(this.campaign).length;
    if(isMyObjectEmpty) return true;
      else return false;   
  }
 
  setChosenCampaign(){   
    this.campaignService.setChosenCampaign.next(this.campaign);
    this.campaignService.toggleVisibility.next(false);
    this.dialog.open(CampaignSelectedDialogComponent);
  }

  getChosenCampaign(){
    this.campaignService.getChosenCampaign.subscribe(data => {
      this.campaignService.setChosenCampaign.next(this.campaign);
    })
  }
} 

