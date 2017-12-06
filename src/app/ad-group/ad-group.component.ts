import { Subject } from 'rxjs/Subject';
import { CampaignListItem } from './../../models/campaign';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdGroupService } from './ad-group-service.service';
import { AdGroup } from '../../models/adGroup';
import { CampaignService } from '../campaign/campaign.service';

@Component({
  selector: 'app-ad-group',
  templateUrl: './ad-group.component.html',
  styleUrls: ['./ad-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdGroupComponent implements OnInit {
  showCreateAdGroup: boolean;
  visible: boolean;
  adGroups: AdGroup[];
  adGroup: AdGroup;
  campaign: CampaignListItem;
  loadAdGroupList: boolean;

  constructor(private adGroupService: AdGroupService,
              private campaignService: CampaignService) { }

  ngOnInit() {
    this.showCreateAdGroup = false;
    this.visible = false;
    this.adGroups = [];
    this.campaign = new CampaignListItem();
    this.loadAdGroupList = false;
    this.adGroup = new AdGroup();

    this.setShowAdGroup();
    this.setShowCreateAdGroup();
    this.setChosenCampaign();
    this.getCreatedAdGroup();
  }

  setShowAdGroup(){
    this.adGroupService.toggleVisibility.subscribe((data: boolean) => {
      this.visible = data;
    });
  }

  setChosenCampaign(){
    this.campaignService.setChosenCampaign.subscribe((data: CampaignListItem) => {
      this.campaign = data;
      this.adGroups = this.adGroupService.getAdGroups(this.campaign);  
    });
  }

  getCreatedAdGroup(){
    this.adGroupService.addCreatedAdGroupToList.subscribe((data) => {
      this.adGroups.push(data);
    });
  }

  campaignChosen(){
    let isMyObjectEmpty = Object.keys(this.campaign).length;
    if(isMyObjectEmpty) return true;
      else return false; 
  }

  setShowCreateAdGroup(){
    this.adGroupService.showCreateAdGroupComponent.subscribe((data: boolean) => {
      this.showCreateAdGroup = data;
    });
  }

  toggleCreateAdGroup(){
    this.showCreateAdGroup = true;
  }

  selectAdGroup(){
    this.adGroupService.setSelectedAdGrop.next(this.adGroup);
    this.visible = !this.visible;
  }

  show(){
    this.visible = !this.visible;    
  }

  deleteAdGroup(){
    this.adGroupService.deleteAdGroup(this.adGroup).subscribe((data) => {
      this.adGroups = this.adGroups.filter(adGroup => adGroup.adGroupId !== data.value[0].id);
      this.adGroup = new AdGroup();
    });
  }

  adGroupIsChosen(){
    let isMyObjectEmpty = Object.keys(this.adGroup).length;
    if(isMyObjectEmpty) return true;
      else return false;   
  }
}
