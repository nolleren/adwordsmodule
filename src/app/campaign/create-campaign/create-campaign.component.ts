import { Campaign } from './../../../models/campaign';
import { CreateCampaignService } from './create-campaign.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  campaign: Campaign;
  date: Date;
  year: number;
  
  constructor(private campaignService: CreateCampaignService) { }

  ngOnInit() {
    this.date = new Date();
    this.year = this.date.getFullYear();

    this.campaign = new Campaign();
    this.campaign.name = "Test Campaign from angular";
    this.campaign.startDate = new Date();
    this.campaign.endDate = new Date().setFullYear(new Date().getFullYear() + 1);
    this.campaign.budget.name = "Test Budget from angular";
    this.campaign.budget.microAmount = 500000000;

    this.createCampagin(this.campaign);
  }

    private newFunction() {
        return this.campaign;
    }

  createCampagin(campaign: Campaign){
    this.campaignService.createCampaign(campaign).subscribe((result) => {
      console.log(result);
    });
  }

}
