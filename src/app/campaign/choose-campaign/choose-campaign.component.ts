import { element } from 'protractor';
import { CampaignService } from './../campaign.service';
import { Campaign, CampaignList } from './../../../models/campaign';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-campaign',
  templateUrl: './choose-campaign.component.html',
  styleUrls: ['./choose-campaign.component.css']
})
export class ChooseCampaignComponent implements OnInit {
  campaignList: CampaignList[] = [];
  campaign: Campaign = new Campaign();

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
    console.log(this.campaignList);
  }

}
