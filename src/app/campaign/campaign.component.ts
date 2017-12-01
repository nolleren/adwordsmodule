import { Router } from '@angular/router';
import { CampaignDto, CampaignListItem } from './../../models/campaign';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  showCreateCampaign: boolean = false;
  visible: boolean = false;

  constructor(private campaignService: CampaignService, private router: Router) { }

  ngOnInit() {
    this.setShowCampaign();
    this.setShowCreateCampaign();
  }

  setShowCampaign(){
    this.campaignService.toggleVisibility.subscribe((data: boolean) => {
      this.visible = data;
      this.router.navigate([""]);
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
