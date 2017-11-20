import { environment } from './../../environments/environment.prod';
import { CampaignListItem, CampaignDto } from './../../models/campaign';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { Toggle } from '../../models/toggle';
import { isDevMode } from '@angular/core';

@Injectable()
export class CampaignService {
    campaignList: CampaignListItem[] = [];
    httpString: string;

    constructor(private http: Http) {
      if(isDevMode()) this.httpString = "http://localhost:52185/api/campaign";
        else this.httpString = "http://adwordsmoduleapi.azurewebsites.net/api/campaign"; 
    }

   // Observable string source
   dataCampaignSource = new Subject<CampaignListItem>();
   dataCreatedCampaignSource = new Subject<CampaignListItem>();
   dataToggleSource = new Subject<Toggle>();
   dataDateOneSource = new Subject<Date>();
   dataDateTwoSource = new Subject<Date>();
   dataVisibleCampaignSource = new Subject();
   
   // Observable string stream
   dataCampaign$ = this.dataCampaignSource.asObservable();
   dataCreatedCampaign$ = this.dataCreatedCampaignSource.asObservable();
   dataToggle$ = this.dataToggleSource.asObservable();
   dataDateOne$ = this.dataDateOneSource.asObservable();
   dataDateTwo$ = this.dataDateTwoSource.asObservable();
   dataVisibleCampaign$ = this.dataVisibleCampaignSource.asObservable();
   
   // Service message commands
  setChosenCampaign(campaign: CampaignListItem) {
     this.dataCampaignSource.next(campaign);
   }

  addCreatedCampaignToList(campaigntest: CampaignListItem){
    console.log(campaigntest);
     this.dataCreatedCampaignSource.next(campaigntest);
   }

  toggle(toggle: Toggle){
     this.dataToggleSource.next(toggle);
   }

  setDateOne(date: Date){
     this.dataDateOneSource.next(date);
   }

  setDateTwo(date: Date){
    this.dataDateTwoSource.next(date);
  }

  setVisibleCampaign(value: boolean){
    this.dataVisibleCampaignSource.next(value);
  }

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
