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
  show: boolean = false;
  collapseOne: boolean = false;
  campaign: CampaignListItem = new CampaignListItem();
 
  constructor(private campaignService: CampaignService){}

  ngOnInit(){
    this.setChosenCampaign();
  }

  setChosenCampaign(){
    this.campaignService.dataCampaign$.subscribe(
      data => {
        this.campaign = data; 
      });
  }

  collapse(value: boolean){
    if(value === this.collapseOne) return this.collapseOne = !this.collapseOne;
  }

  showMe(){
    this.show = !this.show;
  }  

}
