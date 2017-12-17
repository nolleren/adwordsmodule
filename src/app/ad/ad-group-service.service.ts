import { ModelSetter } from './../../models/modelSetter';
import { AdGroup } from './../../models/adGroup';
import { Subject } from 'rxjs/Subject';
import { Injectable, isDevMode } from '@angular/core';
import { Http } from '@angular/http';
import { CampaignListItem } from '../../models/campaignListItem';

@Injectable()
export class AdGroupService {
  toggleVisibility;
  showCreateAdGroupComponent;
  addCreatedAdGroupToList;
  setSelectedAdGrop;
  httpString: string;
  modelSetter: ModelSetter;

  constructor(private http: Http) {
    this.toggleVisibility = new Subject<boolean>();
    this.showCreateAdGroupComponent = new Subject<boolean>();
    this.addCreatedAdGroupToList = new Subject<AdGroup>();
    this.setSelectedAdGrop = new Subject<AdGroup>();
    this.modelSetter = new ModelSetter();

    if(isDevMode()) this.httpString = "http://localhost:52185/api/adgroups";
    else this.httpString = "https://adwordsmoduleapi.azurewebsites.net/api/adgroups"; 
  }



  createAdGroup(adgroup: AdGroup){
    return this.http.post(this.httpString, adgroup).map(res => res.json());
  }

  getAdGroups(campaign: CampaignListItem, getAllAdGroups: boolean){
    let adGroups: AdGroup[] = [];
    this.http.get(this.httpString + "/" + campaign.id + "/" + getAllAdGroups).map(res => res.json())
        .subscribe((data) => {
          for(let i = 0; i < data.length; i++){
              adGroups.push(this.modelSetter.setAdGroup(data[i]));
            };
        });
        return adGroups;
  }

  deleteAdGroup(adGroup: AdGroup){
    return this.http.delete(this.httpString + "/delete/" + adGroup.adGroupId).map(res => res.json());
  }
}
