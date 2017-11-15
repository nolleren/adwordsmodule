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

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.setShowCampaign();
  }

  setShowCampaign(){
    this.campaignService.dataToggle$.subscribe(data => {
      this.showCampaign = data.value;
    });
  }
}
