import { environment } from './../../environments/environment.prod';
import { CampaignListItem, CampaignDto } from './../../models/campaign';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { isDevMode } from '@angular/core';

@Injectable()
export class CampaignService {
    campaignList: CampaignListItem[] = [];
    httpString: string;

    constructor(private http: Http) {
      //this.httpString = "http://localhost:52185/api/campaign";
      this.httpString = "http://adwordsmoduleapi.azurewebsites.net/api/campaign"; 
    }

   // Observable string source
   addCreatedCampaignToList = new Subject<CampaignListItem>();
   toggleVisibility = new Subject<boolean>();
   showCreateCampaignComponent = new Subject<boolean>();
   startDate = new Subject<Date>();
   endDate = new Subject<Date>();
   setChosenCampaign = new Subject<CampaignListItem>();

   createCampaign(campaign: CampaignDto){
    campaign.budget.microAmount *= 1000000;
    campaign.budget.name = new Date().toString();
    return this.http.post(this.httpString, campaign).map(res => res.json()); 
  }

  getCampaigns(){
    this.campaignList = [];
    this.http.get(this.httpString).map(res => res.json())
          .subscribe(result => {
            result.forEach(element => {
              let campaign: CampaignListItem = {
                id: element.id,
                name: element.name
              };
              this.campaignList.push(campaign);
            });
          });
          return this.campaignList;                                                               
  }

}
