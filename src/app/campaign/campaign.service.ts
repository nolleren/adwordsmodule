import { CampaignListItem, CampaignDto } from './../../models/campaign';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
import { Toggle } from '../../models/toggle';

@Injectable()
export class CampaignService {
    campaignList: CampaignListItem[] = [];

    constructor(private http: Http) {
    }

   // Observable string source
   dataCampaignSource = new Subject<CampaignDto>();
   dataCreatedCampaignSource = new Subject<CampaignListItem>();
   dataToggleSource = new Subject<Toggle>();
   dataDateOneSource = new Subject<Date>();
   dataDateTwoSource = new Subject<Date>();
   
   // Observable string stream
   dataCampaign$ = this.dataCampaignSource.asObservable();
   dataCreatedCampaign$ = this.dataCreatedCampaignSource.asObservable();
   dataToggle$ = this.dataToggleSource.asObservable();
   dataDateOne$ = this.dataDateOneSource.asObservable();
   dataDateTwo$ = this.dataDateTwoSource.asObservable();
   
   // Service message commands
  setChosenCampaign(campaign: CampaignDto) {
     this.dataCampaignSource.next(campaign);
   }

  addCreatedCampaignToList(campaign: CampaignListItem){
     this.dataCreatedCampaignSource.next(campaign);
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

  createCampaign(campaign: CampaignDto){
    campaign.budget.microAmount *= 1000000;
    campaign.budget.name = new Date().toString();
    return this.http.post("http://localhost:52185/api/campaign", campaign).map(res => res.json()); 
    //return this.http.post("http://adwordsmoduleapi.azurewebsites.net/api/campaign", campaign).map(res => res.json()); 
  }

  getCampaigns(){
    this.campaignList = [];
    this.http.get("http://adwordsmoduleapi.azurewebsites.net/api/campaign").map(res => res.json())
          .subscribe(result => {
            result.forEach(element => {
              let campaign: CampaignListItem = {
                id: element.idField,
                name: element.nameField
              };
              this.campaignList.push(campaign);
            });
          });
          return this.campaignList;                                                               
  }

}
