import { CampaignDto, CampaignListItem } from './../../models/campaign';
import { Http } from '@angular/http';
import { AdwordsContent } from './../../models/adwordsContent';
import { Injectable, isDevMode } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ContentProduct } from '../../models/contentProduct';

@Injectable()
export class ListService {
  updateAd = new Subject<ContentProduct>();
  httpString: string;

  constructor(private http: Http) {
    if(isDevMode()) this.httpString = "http://localhost:52185/api/ads";
    else this.httpString = "http://adwordsmoduleapi.azurewebsites.net/api/ads"; 
   }

   createAds(adwordsContent: AdwordsContent){
      return this.http.post("http://localhost:52185/api/ads", adwordsContent).map(res => res.json());
   }

   getstring(){
    return this.http.get("http://localhost:52185/api/test").map(res => res.json()).subscribe(data => {
      console.log(data);
    });
   }
}
