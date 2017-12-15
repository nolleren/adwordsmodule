import { element } from 'protractor';
import { environment } from './../../environments/environment.prod';
import { CampaignListItem } from './../../models/campaignListItem';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { isDevMode } from '@angular/core';
import { ModelSetter } from '../../models/modelSetter';
import { CampaignDto } from '../../models/campaign';

@Injectable()
export class CampaignService {
  addCreatedCampaignToList;
  toggleVisibility;
  showCreateCampaignComponent;
  startDate;
  endDate;
  setChosenCampaign;
  removeCampaign;
  httpString: string;
  modelSetter: ModelSetter;

  constructor(private http: Http) {
    this.addCreatedCampaignToList = new Subject<CampaignListItem>();
    this.toggleVisibility = new Subject<boolean>();
    this.showCreateCampaignComponent = new Subject<boolean>();
    this.startDate = new Subject<Date>();
    this.endDate = new Subject<Date>();
    this.setChosenCampaign = new Subject<CampaignListItem>();
    this.removeCampaign = new Subject<CampaignListItem>();
    this.modelSetter = new ModelSetter();

    if(isDevMode()) this.httpString = "http://localhost:52185/api/campaign";
    else this.httpString = "https://adwordsmoduleapi.azurewebsites.net/api/campaign"; 
  }

   
  createCampaign(campaign: CampaignDto){
    campaign.budget.microAmount *= 1000000;
    campaign.budget.name = new Date().toString();
    return this.http.post(this.httpString, campaign).map(res => res.json()); 
  }

  deleteCampaign(campaign: CampaignListItem){
    return this.http.delete(this.httpString + "/" + campaign.id).map(res => res.json());
  }

  getCampaigns(){
    let campaignList: CampaignListItem[] = [];
    this.http.get(this.httpString).map(res => res.json())
          .subscribe(data => {
            for(let i = 0; i < data.length; i++) {
              campaignList.push(this.modelSetter.setCampaignListItem(data[i]));
          };
        });
        return campaignList;                                                            
  }
}
