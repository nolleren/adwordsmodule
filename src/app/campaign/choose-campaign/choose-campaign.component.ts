import { ListService } from './../../list/list.service';
import { MatDialog } from '@angular/material';
import { CampaignService } from './../campaign.service';
import { CampaignDto } from './../../../models/campaign';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { empty } from 'rxjs/Observer';
import { Dialog } from '../../../models/dialog';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { CampaignListItem } from '../../../models/campaignListItem';

@Component({
  selector: 'app-choose-campaign',
  templateUrl: './choose-campaign.component.html',
  styleUrls: ['./choose-campaign.component.css']
})
export class ChooseCampaignComponent implements OnInit {
  campaign: CampaignListItem = new CampaignListItem();
  campaignList: CampaignListItem[] = [];
  disableButtons: boolean = false;
  showCreateCampaign: boolean = false;
  visible: boolean = false;

  constructor(private campaignService: CampaignService,
              private dialog: MatDialog,
              private listService: ListService) { }

  ngOnInit() {
    this.campaignList = this.campaignService.getCampaigns();
    this.addCampaignToList();
    this.setShowCampaign();
    this.setShowCreateCampaign();
    this.reset();
  }

  reset(){
    this.listService.resetProcess.subscribe(data => {
      this.campaign = new CampaignListItem();
      this.campaignService.toggleVisibility.next(false);
      this.showCreateCampaign = false;
    });
  }

  setShowCampaign(){
    this.campaignService.toggleVisibility.subscribe((data: boolean) => {
      this.visible = data;
    })
  }

  setShowCreateCampaign(){
    this.campaignService.showCreateCampaignComponent.subscribe((data: boolean) => {
      this.showCreateCampaign = data;
    })
  }

  show(){
    this.visible = !this.visible;
  }

  addCampaignToList(){
    this.campaignService.addCreatedCampaignToList.subscribe((data: CampaignListItem) => {
      this.campaignList.push(data);
    });
  }

  deleteCampaign(){
    this.campaignService.deleteCampaign(this.campaign).subscribe(
      data => {
      this.campaignList = this.campaignList.filter(campaign => campaign.id !== data.value[0].baseCampaignId);
      this.campaign = new CampaignListItem();
      let dialog: Dialog = {
        headline: "Kampagnen blev slettet",
        message: "Kampagnen er nu fjernet fra listen"
      };
      this.dialog.open(DialogComponent, { data: dialog });
    },
    err => {
      let dialog: Dialog = {
        headline: "Kampagnen blev ikke slettet",
        message: "Der opstod en fejl under sletning af kampagnen, prøv venligst igen"
      };
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
    let dialog: Dialog = {
      headline: "Kampagnen blev valgt",
      message: "Gå videre til 'Vælg annoncegruppe'"
    };
    this.dialog.open(DialogComponent, { data: dialog });
  }
} 

