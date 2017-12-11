import { AdGroup } from './../../models/adGroup';
import { Subject } from 'rxjs/Subject';
import { Injectable, isDevMode } from '@angular/core';
import { Http } from '@angular/http';
import { CampaignListItem } from '../../models/campaign';

@Injectable()
export class AdGroupService {
  toggleVisibility = new Subject<boolean>();
  showCreateAdGroupComponent = new Subject<boolean>();
  addCreatedAdGroupToList = new Subject<AdGroup>();
  setSelectedAdGrop = new Subject<AdGroup>();
  httpString: string;

  constructor(private http: Http) {
    if(isDevMode()) this.httpString = "http://localhost:52185/api/adgroups";
    else this.httpString = "https://adwordsmoduleapi.azurewebsites.net/api/adgroups"; 
  }



  createAdGroup(adgroup: AdGroup){
    return this.http.post(this.httpString, adgroup).map(res => res.json());
  }

  getAdGroups(campaign: CampaignListItem){
    let adGroups: AdGroup[] = [];
    this.http.get(this.httpString + "/" + campaign.id).map(res => res.json())
        .subscribe((data) => {
          for(let i = 0; i < data.length; i++){
            let adgroup: AdGroup = {
              adGroupId: data[i].id,
              name: data[i].name,
              keyWords: "",
              campaignId: data[i].campaignId
            };
            adGroups.push(adgroup);
          } 
        });
        return adGroups;
  }

  deleteAdGroup(adGroup: AdGroup){
    return this.http.delete(this.httpString + "/delete/" + adGroup.adGroupId).map(res => res.json());
  }
}
