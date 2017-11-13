import { Campaign, CampaignList } from './../../models/campaign';
import { Component, OnInit } from '@angular/core';
import { CampaignService } from './campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  showCampaign: boolean = false;
  campaignList: CampaignList[] = [];
  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
      this.campaignService.getCampaigns().subscribe((result) => {
        result.forEach(element => {
          let campaign: CampaignList = {
            id: element.idField,
            name: element.nameField
          };
        this.campaignList.push(campaign);
      });
    });
  }

  getCampaigns(){
      this.campaignService.getCampaigns().subscribe((result) => {
        result.forEach(element => {
          let campaign: CampaignList = {
            id: element.idField,
            name: element.nameField
          };
        this.campaignList.push(campaign);
      });
    });
  } 

  updateCreateCampaign(event){
    this.showCampaign = event;
  }

  addCreatedCampaign(){
    this.campaignList = [];
    this.getCampaigns();
  }

}
