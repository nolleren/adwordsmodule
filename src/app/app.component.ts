import { AdContentService } from './content/ad-content.service';
import { ProductService } from './products/product.service';
import { Product } from './../models/product';
import { CampaignService } from './campaign/campaign.service';
import { CampaignListItem } from './../models/campaign';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Google Adwords App';
  campaign: CampaignListItem = new CampaignListItem();
 
  constructor(private campaignService: CampaignService){}

  ngOnInit(){
    this.setChosenCampaign();
  }
  
  setChosenCampaign(){
    this.campaignService.setChosenCampaign.subscribe((data: CampaignListItem) => {
      this.campaign = data;
    })
  }
}
