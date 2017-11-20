import { CampaignDto, CampaignListItem } from './../../models/campaign';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  showCampaign: boolean = false;
  visible: boolean = false;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.setShowCampaign();
    this.setVisibleCampaign();
  }

  setShowCampaign(){
    this.campaignService.dataToggle$.subscribe(data => {
      this.showCampaign = data.value;
    });
  }

  setVisibleCampaign(){
    this.campaignService.dataVisibleCampaign$.subscribe(data => {
      this.visible = false;
    })
  }

  show(){
    this.visible = !this.visible;
  }
}
