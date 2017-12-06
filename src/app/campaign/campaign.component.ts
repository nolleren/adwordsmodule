import { CampaignDto, CampaignListItem } from './../../models/campaign';
import { Component, OnInit } from '@angular/core';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  showCreateCampaign: boolean = false;
  visible: boolean = false;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.setShowCampaign();
    this.setShowCreateCampaign();
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
}
